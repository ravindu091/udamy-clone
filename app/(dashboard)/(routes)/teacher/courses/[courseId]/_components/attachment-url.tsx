"use client";

import * as z from "Zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { File, Loader2, Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Attachment, Course } from "@prisma/client";
import {useRouter} from 'next/navigation'

interface AttachmentUrlFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().url("Invalid URL"),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentUrlFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);


    const toggleEdit = () => {
        setIsEditing((current) => !current);
        form.reset({ url: '' }); // Reset the form values when toggling edit mode
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success('Course updated');
            toggleEdit();
            router.refresh();
        } catch {
            toast.error('Something went wrong');
        }
    };

    const onDelete = async (id:string)=>{
        try{
            setDeletingId(id)
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success('Attachment Deleted')
            router.refresh()
        }catch{
            toast.error('Somthing went wrong')
        }finally{
            setDeletingId(null)
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Attachment
                <Button onClick={toggleEdit} variant='ghost'>
                    {isEditing ? <>Cancel</> : <><Pencil className="h-4 w-4 mr-2 ml-1" />Add</>}
                </Button>
            </div>
            {!isEditing ? (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className='text-sm text-slate-500 italic'>
                            There are no attachments
                        </p>
                    )}
                    {
                        initialData.attachments.map((attachment)=>{
                            return <div key={attachment.id} className="flex flex-row">
                                <File className="h-4 w-4 mr-2 ml-1" />
                                <p className="text-sm text-slate-400 line-clamp-1">{attachment.name}</p>
                                {
                                    attachment.id === deletingId && <Loader2 className="h-4 w-4 ml-auto animate-spin" />
                                }
                                {
                                    attachment.id !== deletingId  && 
                                    <button 
                                        className="ml-auto hover:opacity-75 transition"
                                        onClick={()=>onDelete(attachment.id)}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                }
                            </div>;
                        })
                    }
                </>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'https://example.com'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button variant='sky' type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default AttachmentForm;
