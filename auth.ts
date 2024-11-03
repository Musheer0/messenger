import NextAuth from "next-auth"
import  Credentials from "next-auth/providers/credentials"
import { GetUserByEmail } from "./lib/actions/auth-actions"
import { compare } from "bcryptjs";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import client from "./prismadb";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
   Credentials({
    credentials:{
        email:{label: 'email', type:'email'},
        password :{label: 'password'}
    },
    authorize: async(credentials) =>{
         if(credentials.email && credentials.password) {
           const user = await GetUserByEmail(credentials.email as string);
           if(user?.password) {
                 const isCorrectPassword = await compare( credentials.password as string,user.password ,);
                 if(isCorrectPassword) {
                    //TODO:check if email verified
                      return user
                 }
                 else{
                    throw new Error("Incorrect Password")
                   }
           }
           else{
            throw new Error("Invalid  credentials")
           }
         }else{
            throw new Error("missing credentials")
         }
    },
   })
  ],
  pages:{
    signIn: '/sign-in'
  },
  adapter: PrismaAdapter(client),
  callbacks:{
    async session({session, token}){
        session.user.id= token.sub!
        return session
    }
  },
  session:{
    strategy: 'jwt'
  }
})