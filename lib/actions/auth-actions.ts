"use server"
import { signIn } from "@/auth";
import client from "../../prismadb"
import { z } from "zod";
import { LoginSchema } from "@/schema/login-schema";
import { AuthError } from "next-auth";
import { RegisterSchema } from "@/schema/register-schema";
import { hash } from "bcryptjs";

export const GetUserById = async(id:string)=>{
    const user = await client.user.findFirst({
        where:{
         id
        }
    });
    return user
};
export const GetUserByEmail = async(email:string)=>{
    const user = await client.user.findFirst({
        where:{
            email
        }
    });
    return user
};
export const ServerSignIn = async(value:z.infer<typeof LoginSchema>)=>{
    const {data} = LoginSchema.safeParse(value);
    if(data===undefined) return {error: 'Missing credentials'}
   try {
    await signIn('credentials',{
        ...data,
        redirect: false
    });
    return {success: true}
   } catch (error) {
     if(error instanceof AuthError){
        return {error: error.cause?.err?.message}
     }
     return {error: 'Internal server error'}
   }
};
export const ServerSignUp = async(value:z.infer<typeof RegisterSchema>)=>{
    const {data} = RegisterSchema.safeParse(value);
    if(data===undefined) return {error: 'Missing credentials'}
    try {
        const HashedPassword = await hash(data.password, 10);
      await prisma?.user.create({
            data:{
                ...data,
                password: HashedPassword
            }
        });
      return {success: 'please check your email to verify your account'}
    } catch (error) {
        return {error: 'email already taken!'}

    }
}