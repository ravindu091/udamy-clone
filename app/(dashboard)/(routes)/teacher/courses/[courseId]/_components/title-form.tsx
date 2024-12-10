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
import { Input } from "@/components/ui/input";
import { title } from "process";

import { Pencil } from "lucide-react";



interface TitleFormProps {
    initialData:{
        title:string;
    };
    courseId:string;
}
const fromSchema = z.object({
    title:z.string().min(3,{
        message:"Use more than 3 charatures"
    }),
})

const TitleForm = ({initialData , courseId}:TitleFormProps)=> {
    const [isEditing,setIsEditing] = useState(false);

    const toggleEdit = ()=>setIsEditing((current)=> !current);

    const router = useRouter()

    const form =useForm<z.infer<typeof fromSchema>>({
        resolver:zodResolver(fromSchema),
        defaultValues:initialData,
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
            Course Title
            <Button onClick={toggleEdit} variant='ghost'>
                {(isEditing ? <>Cancel</> : <><Pencil className="h-4 w-4 mr-2 ml-1" />Edit title </>)}     
            </Button>
        </div>
        {!isEditing ? (
            <p className="text-sm mt-2">
                {initialData.title}
            </p>
        ):(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-4 mt-4"
            >
                <FormField 
                    control={form.control}
                    name="title"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input 
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

export default TitleForm;