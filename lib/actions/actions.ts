"use server"

import { auth } from "@/auth"
import { GetUserById } from "./auth-actions";
import client from "../../prismadb";
import { ConversationType, UserDetailsSelect } from "@/type/user";
import { error } from "console";
import { ChatWithMessags } from "@/type/chat";

export const GetCurrentUser = async()=>{
       const session = await auth();
       if(session?.user?.id){
        const user = await GetUserById(session.user.id!);
        return user;
       }
       else return null
};

export interface PublicUser {
        id: string|null;
        name: string | null;
        email: string | null;
        image: string | null;
    
};
export const GetPublicUserByEmail = async(email:string)=>{
    const session = await auth();
if(session?.user?.email!==email){
    const user = await client.user.findMany({
        where:{
            email
        },
        select:{
             email: true,
             id:true,
             name: true,
             image: true
        }
    });
    return user as PublicUser[]
}
};
export const GetChats = async()=>{
    const sesssion = await auth()
    if( !sesssion?.user?.id) return null;
    try {
        const chat = await client.user.findFirst({
            where:{
                id: sesssion.user.id
            },
            select:{
                conversations:{
                    include:{
                        users:{
                            select:{
                                image: true,
                                name: true,
                                email: true
                            }
                        },
                        messages:{
                            orderBy:{
                                createdAt: 'desc'
                            },
                            take:1,
                        
                        }
                    }
                }
            }
        });
        return chat?.conversations as ConversationType[] |undefined
    } catch (error) {
        return null
    }
};
export const GetChat = async(id:string)=>{
    if(!id) return null
    const session = await auth();
    if(!session?.user?.id) return null
    const chat = await client.conversation.findFirst({
        where:{
            id,
            userIds:{
                has: session.user.id
            }
        },
        include:{
            users: {
                select:{
                    image: true,
                    name: true,
                    email: true
                } 
            },
        }
    }) as ChatWithMessags
    return chat
}