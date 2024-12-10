"use client";

import * as z from "Zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
    FormDescription,

} from "@/components/ui/form";
import { Button } from "@/components/ui/button";


import {  PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";



interface ChaptersForm {
    initialData:Course & {chapters : Chapter[]};
    courseId:string;
}
const fromSchema = z.object({
    title:z.string().min(3,{
        message:'Title must contain min 3 letters'
    })
})

const ChaptersForm = ({initialData , courseId}:ChaptersForm)=> {
    const [isCreating , setIsCreating] = useState(false);
    //is editing
    const [isUpdating ,setIsUpdating] = useState(false);

    const toggleCreating = ()=>setIsCreating((current)=> !current);

    const router = useRouter()

    const form =useForm<z.infer<typeof fromSchema>>({
        resolver:zodResolver(fromSchema),
        defaultValues:{
           title:''
        },
    });
    const {isSubmitting,isValid} = form.formState;
    //submit function
    const onSubmit =async (values:z.infer<typeof fromSchema>)=>{
        console.log(values);
        try {
            await axios.post(`/api/courses/${courseId}/chapters`,values);
            toast.success('Chapter created')
            toggleCreating();
            router.refresh();
        } catch {
            toast.error('Somthing went wrong');
        }
    }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium  flex items-center justify-between">
            course Chapters
            <Button onClick={toggleCreating} variant='ghost'>
                {(isCreating ? <>Cancel</> : <><PlusCircle className="h-4 w-4 mr-2 ml-1" />Add a chapter </>)}     
            </Button>
        </div>
        {isCreating && (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-4 mt-4"
            >
                <FormField 
                    control={form.control}
                    name='title'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                
                                placeholder="e.g. 'Introduction to the course'" {...field}/>
                                
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}

                />
                
                    <Button variant='sky' type="submit">Create</Button>
               
            </form>
        </Form>)}
        {!isCreating && (
            <div className={cn(
                "text-sm mt-2",
                !initialData.chapters.length && "text-slate-500 italic"
            )}>
                {!initialData.chapters.length && 'No Chapters'}
                {/* TODO : Add list of chapters */}
            </div>
        )
        }{
            !isCreating && (
                <p className="  text-xs text-muted-foreground mt-4">
                    Drag and drop to reoder to chapters
                </p>
            )
        }
    </div>
  )
}

export default ChaptersForm;