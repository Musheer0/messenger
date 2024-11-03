import { Prisma } from "@prisma/client";

export type ChatWithMessags = Prisma.ConversationGetPayload<{
    include:{
        users: {
            select:{
                name:true,
                email: true,
                image:true
            }
        }
    }
}>
export type FullMessage = Prisma.MessageGetPayload<{
    include:{
    sender:{
        select:{
            name: true,
            email: true,
            image: true
        }
    },
    seen:{
        select:{
            name: true,
            email: true,
            image: true
        },
        
    }
    }
}>
export type FullMessagePage = {
    message:FullMessage[],
    nextCursor:string|null
}