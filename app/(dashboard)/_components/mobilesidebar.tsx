
import {Menu} from 'lucide-react'
import {
    Sheet,
    SheetTrigger,
    SheetContent

} from '@/components/ui/sheet'
import SideBar from './sidebar';

export const MobileSidebar = ()=>{
    return(
        <Sheet>
            <SheetTrigger className='md:hidden hover:opacity-75 transition '>
              <Menu />
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SideBar />
            </SheetContent>
        </Sheet>
    );
}