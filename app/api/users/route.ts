import { auth } from "@/auth";
import client from "@/prismadb";
import { NextRequest, NextResponse } from "next/server";
export const MAX_SIZE= 10
export async function GET(req:NextRequest){
    const session = await auth();
    if(session?.user?.id) {
         const users = await client.user.findMany({
            where:{
                NOT:{
                    id: session.user.id
                },
            },
            take:MAX_SIZE+1,
            select:{
                email: true,
                name: true,
                image: true,
                id:true,
                
            }
         });
        return NextResponse.json({users})
    }
    else return NextResponse.json({error: 'Unauthorized'})
}