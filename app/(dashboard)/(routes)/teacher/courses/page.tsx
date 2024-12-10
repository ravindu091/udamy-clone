import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const CoursePage = async () => {
  const {userId} = auth();
  


    return ( 
        <div className="p-6">
           <Link href='/teacher/create' >
              <Button variant='sky'>
                New Course
              </Button>
            </Link>
        </div>
     );
}
 
export default CoursePage;