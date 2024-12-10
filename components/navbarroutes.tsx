'use client'


import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const NavbarRoutes = ()=>{
    const pathName =usePathname();
    const router = useRouter();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isPlayerPage = pathName?.includes("/chapter");


    
    return (
        <div className="flex item-center gap-x-2 ml-auto">
           
            {isTeacherPage|| isPlayerPage ?(
                <Link href='/'>
                    <Button>
                    <LogOut  className="h-4 w-4  mr-2" />
                </Button>
                </Link>
            ):<Link href="/teacher/courses"><Button size='sm' variant='ghost'>Teacher Mode</Button></Link> }
            
            <UserButton />
        </div>
    );
}