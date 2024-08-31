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
  ]
})

//the handler function is used as the both get and post 
export { handler as GET, handler as POST }