import { NavbarRoutes } from "@/components/navbarroutes";
import { MobileSidebar } from "./mobilesidebar";


const NavBar=()=>{
    return(
        <div className="p-4 boder-b h-full flex item-center bg-white shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
}

export default NavBar;