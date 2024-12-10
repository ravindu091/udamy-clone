import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageUrlForm from "./_components/image-url";
import CategoryForm from "./_components/category";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-url";
import ChaptersForm from "./_components/chapters-form";



const CourseIdPage = async ({params}:{
    params:{
        courseId:string;
    }
    
}) => {
    //Getting user id
    const {userId} = auth();
    //check userId
    if(!userId){
        return redirect("/");
    }
  
    //get data about corse from db
    const course = await db.course.findUnique({
        where:{
            id: params.courseId,
            userId
        },
        include:{
            chapters:{
                orderBy:{
                    position:'asc'
                }
            },
            attachments:{
                orderBy:{
                    createAt:'desc'
                }
            }
        }
    });
    const categories = await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    })
    
    //Check course in the database
    if(!course){
     return redirect('/');
    }
    
    const requiredField = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter=> chapter.isPublished)
    ]
    //find completed fields
    const totalFields = requiredField.length;
    const completedFields = requiredField.filter(Boolean).length;

    return ( 
    <div className="p-6"> 
        <div className="flex items-center justify-between">
           <div className="flex flex-col gap-y-2">
             <h1 className="text-2xl font-medium">
                Course Setup
             </h1>
             <span className="text-sm text-slate-700">
                Complete all field ({completedFields}/{totalFields})
             </span>
           </div> 
           
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-xl">Customize your course</h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                    initialData={course}
                    courseId={course.id}
                     />
                     <ImageUrlForm 
                     initialData={course}
                     courseId={course.id} />
                     
                     <CategoryForm
                     initialData={course}
                     courseId={course.id}
                     options={
                        categories.map((category)=>({
                            label:category.name,
                            value:category.id,
                        }))
                     }
                     />
                </div>
                <div className="space-y-6">
                     <div>
                        <div className="flex items-center gap-x-2">
                            <h2 className="text-xl">Course Chapters</h2>
                        </div>
                        <ChaptersForm
                    initialData={course}
                    courseId={course.id}
                     />
                     </div>
                     <div>
                        <div className="flex items-center gap-x-2"> 
                            <h2 className="text-xl">Sell your course</h2>
                        </div>
                        <PriceForm
                          initialData={course}
                          courseId={course.id}

                        
                        />
                     </div>
                     <div>
                        <div className="flex items-center gap-x-2"> 
                            <h2 className="text-xl">Attachment & Resources</h2>
                        </div>
                        <AttachmentForm
                     initialData={course}
                     courseId={course.id} />
                     </div>
                </div>
           </div>
    </div> 
    );
}
 
export default CourseIdPage;