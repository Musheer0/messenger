import { auth } from "@/auth";
import client from "@/prismadb";

export async function POST(req:Request){
    const body =await req.json();
    const {
        userId,
        isGroup,
        members,
        name
    } = body as {
        userId:string,
        isGroup?:boolean,
        members?:string[] ,
        name?:string
    }
    const session = await auth()
    if(!session?.user) return Response.json({error: 'Unauthorized'}, {status: 401});
    if(isGroup && (!members||members.length<2||!name))return Response.json({error: 'Invalid data'}, {status: 400});
    try {
        if(isGroup){
            const newGroupChat = await client.conversation.create({
             data:{
                 name,
                 isGroup,
                 users:{
                     connect:[
                       ...members?.map((member:string)=>({id:member}))||[],
                       {id: session.user.id!}
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
            return Response.json({newGroupChat},{status:200})
     }
     else{
      if(userId){
        const existingChat = await client.conversation.findMany({
            where:{
                OR:[
                    {
                        userIds: {
                            equals: [session.user.id!, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId,session.user.id!]
                        }
                    }
                ]
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
      if(existingChat.length>0){
        return Response.json({ newChat:existingChat[0]},{status:200})

      }
      else{
             
        const newChat = await client.conversation.create({
            data:{
                name,
                isGroup,
                users:{
                    connect:[
                      {id: session.user.id!},
                      {id: userId}
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
           return Response.json({newChat},{status:200})
      }
      }
      else return Response.json({error: 'Invalid data'}, {status: 400});
     }
    } catch (error) {
        Response.json({error: 'Invalid server'}, {status: 500});
    }
}