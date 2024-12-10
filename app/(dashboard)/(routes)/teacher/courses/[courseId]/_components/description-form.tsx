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


import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";



interface DescriptionFormProps {
    initialData:Course;
    courseId:string;
}
const fromSchema = z.object({
    description:z.string().min(3,{
        message:"Description is requred"
    }),
})

const DescriptionForm = ({initialData , courseId}:DescriptionFormProps)=> {
    //is editing
    const [isEditing,setIsEditing] = useState(false);

    const toggleEdit = ()=>setIsEditing((current)=> !current);

    const router = useRouter()

    const form =useForm<z.infer<typeof fromSchema>>({
        resolver:zodResolver(fromSchema),
        defaultValues:{
            description:initialData?.description || "",
        },
    });
    const {isSubmitting,isValid} = form.formState;
    //submit function
    const onSubmit =async (values:z.infer<typeof fromSchema>)=>{
        console.log(values);
        try {
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success('Course updated')
            toggleEdit();
            router.refresh();
        } catch {
            toast.error('Somthing went wrong');
        }
    }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium  flex items-center justify-between">
            Description
            <Button onClick={toggleEdit} variant='ghost'>
                {(isEditing ? <>Cancel</> : <><Pencil className="h-4 w-4 mr-2 ml-1" />Edit Description </>)}     
            </Button>
        </div>
        {!isEditing ? (
            <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                {(initialData.description ? `${initialData.description}` : 'No description')}
            </p>
        ):(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-4 mt-4"
            >
                <FormField 
                    control={form.control}
                    name="description"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Textarea 
                                disabled={isSubmitting}
                                
                                placeholder="e.g. 'Advanced web development'" {...field}/>
                                
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}

                />
                <div className="flex items-center gap-x-2">
                    <Button variant='sky' type="submit">Save</Button>
                </div>
            </form>
        </Form>)}
    </div>
  )
}

export default DescriptionForm;