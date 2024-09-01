import { prismaClient } from "@/app/lib/db";
import { YT_REGEX } from "@/app/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const CreateStreamSchema=z.object({
    creatorId:z.string(),
    url:z.string()

})
const YT=new RegExp(YT_REGEX);


export async function POST (req:NextRequest){
    //the below code is used for data correction
    
    try {
        const data= CreateStreamSchema.parse(await req.json());
        const isYt=YT.test(data.url);
        
        if(!isYt){
            return NextResponse.json({
                message:"Wrong URL format "
               },{
                status:411
               }) 
        }


        //it is the extracted id from the url we have 
        const extractedId=data.url.split("?v=")[1];

          await prismaClient.stream.create({
           data:{
            userId:data.creatorId,
            url:data.url,
            extractedId,
            type:"Youtube"
           }
        })

    } catch (error) {
       return NextResponse.json({
        message:"Error while adding a stream "
       },{
        status:411
       })
        
    }
    
}

export async function GET(req:NextRequest){
    const creatorId=req.nextUrl.searchParams.get("creatorId");
    const streams=await prismaClient.stream.findMany({
        where:{
            userId:creatorId ?? ""
        }
    })

    return NextResponse.json({
        streams
    })
}