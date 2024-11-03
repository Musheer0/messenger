import { MAX_SIZE } from "@/app/api/users/route";
import { auth } from "@/auth";
import client from "@/prismadb";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,{params:{id}}:{params:{id:string}}){
        const cursor = req.nextUrl.searchParams.get("cursor");
    if(!id) return Response.json({error:'Missing data'}, {status: 401});
       const session = await auth();
       if(!session?.user) return Response.json({error:'Unauthorized'}, {status: 403});
       const messages = await client.message.findMany({
        where:{
            conversationId: id,
        },
        include:{
            seen:{
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
        },
        orderBy:{
            createdAt: 'desc'
        },
        cursor: cursor? {id:cursor}: undefined,
        take:MAX_SIZE+1
    });
    if(cursor===null && messages.length>0){
        if(!messages.reverse()[messages.length>MAX_SIZE ? MAX_SIZE : messages.length-1].seenByIds.includes(session.user.id!)){
            const seenMsg = await client.message.update({
                where:{
                    id: messages[messages.length>MAX_SIZE ? MAX_SIZE : messages.length-1].id,
                },
                data:{
                    seen:{
                        connect:[
                            {id: session.user.id}
                        ]
                    }
                }
            });
        }

    }
    console.log(messages,id)
    const nextCursor = messages.length>MAX_SIZE ? messages[MAX_SIZE].id : null
    return Response.json({message:messages.slice(cursor? 1: 0), nextCursor});
    
    
}