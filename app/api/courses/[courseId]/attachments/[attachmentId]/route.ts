import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { NextResponse } from "next/server";


export async function DELETE(
        req:Request ,
        {params}:{params:{ courseId :string , attachmentId:string}}
){
    try {
        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401})

        }

        const courseOwner = await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId,
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401})
        }

        await db.attachment.delete({
            where:{
                id:params.attachmentId,
            }
        })

        return new NextResponse("OK",{status:200})
        

    } catch (error) {
        console.log('COURSE_ID_ATTACHMENTS_DELETE',error)
        return new NextResponse('Internal Error',{status:500})
    }
}