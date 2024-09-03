import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


//for production:--->https://{YOUR_DOMAIN}/api/auth/callback/google
const handler = NextAuth({
  //i need to use google
  providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "" ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
      })
  ],
  secret:process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks:{
   async signIn(params){
     
    if(!params.user.email){
      return false;
    }
      try {
        await prismaClient.user.create({
          data:{
            email:params.user.email,
            provider:"Google"
          }
        })
      } catch (error) {
        
      }
     
      return true;
    }
  }
})

//the handler function is used as the both get and post 
export { handler as GET, handler as POST }