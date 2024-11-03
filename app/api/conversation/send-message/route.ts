import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher/pusher";
import client from "@/prismadb";

export async function POST(req:Request){
    const session = await auth();
    if(!session?.user) return Response.json({error: 'Unauthorized'},{status: 403});
    try {
        const body  = await req.json();
        const {
            id,
            message,
            image
        } = body as {
            id:string,
            message:string
            image?:string
        }
        if(!id )return Response.json({error: 'invalid data'},{status: 401});
        const newMessage = await client.message.create({
            data:{
                body: message,
                conversation:{
                    connect:{
                        id
                    }
                },
                sender:{
                    connect:{
                        id: session.user.id
                    }
                },
                image,
                seen: {
                    connect:[
                        {id: session.user.id}
                    ]
                }
            },
            include:{
                seen: {
                    select:{
                        name: true,
                        email: true,
                        image: true
                    }
                },
                sender:{
                    select:{
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });
        const updatedConversation = await client.conversation.update({
            where:{
                id,
                userIds: {
                    has: session.user.id
                }
            },
            data:{
                lastMessageAt: newMessage.createdAt,
                messages:{
                    connect:[
                        {id:newMessage.id}
                    ]
                }
            },
            include:{
                users:{
                    select:{
                        name: true,
                        image: true,
                        email:true,
                        id:true
                    }
                }
            }
        });
        await pusherServer.trigger(id, 'message:new', newMessage);
        await Promise.all(
            updatedConversation.users.map(async (user) => {
              await pusherServer.trigger(user.id, 'convo:lastmsg', newMessage);
            })
          );
          
        return Response.json(newMessage, {status: 200});
    } catch (error) {
        console.log(error, 'api-send-message')
        return Response.json({error: 'Internal server error'},{status: 500});
    }
}