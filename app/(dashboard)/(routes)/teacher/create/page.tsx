"use client"
import * as z from "Zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';


import {
    Form,
    FormControl,
    FormDescription,
    FormLabel,
    FormField,
    FormMessage,
    FormItem,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ghost } from 'lucide-react';



const formSchema = z.object({
    title:z.string().min(3,{
        message:'Title must be at least 3 characters'
    }),
    
} );


const createCourse = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver :zodResolver(formSchema),
        defaultValues:{
            title:'',
    
        }

    });

    const {isSubmitting,isValid} =form.formState;

    const onSubmit =async (values:z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post('/api/courses',values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success('Course created successfully');
        }catch{
            toast.error('Something went wrong');
            
        }
    }
    return ( 
        <div className='max-w-5xl mx-auto md:items-center md:justify-center  p-6 h-full '>
            <div >
                <h1 className='text-2xl font-bold text-sky-600'>Name your course</h1>
                <p className='text-sm text-slate-600'>What would you like to name your course. Don't worry you can it change later </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                        <FormField 
                            control={form.control}
                            name='title'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="E.g 'Advanced web development' "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                   
                                    <FormDescription>
                                        What will you teach in this course
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <div className='flex iteam-center gap-x-2'>
                            <Link href='/'><Button variant={'ghost'} 
                            >Cancel</Button></Link>
                            <Button type='submit' disabled={!isValid || isSubmitting}>Create</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default createCourse;