"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    href: string,
}

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
    const pathName = usePathname();
    const router = useRouter();
    const isActive = (pathName === '/' && href === '/') || pathName?.startsWith(`${href}/`) || (pathName === href);

    const onClick = () => {
        router.push(href);
    }

    return (
        <div>
            <button
                onClick={onClick}
                type="button"
                className={cn(
                    "flex items-center gap-x-2 text-slate-500 w-full h-full text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                    isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                )}
            >
                <div className="flex h-full w-full items-center gap-x-2 py-4">
                    <Icon
                        size={22}
                        className={cn("text-slate-500", isActive && "text-sky-700")}
                    />
                    {label}
                </div>
                <div className={cn(
                    "ml-auto h-full border-2  transition-all  ",
                    isActive && "border-sky-700"
                )} />
            </button>
        </div>
    );
}

export default SidebarItem;
