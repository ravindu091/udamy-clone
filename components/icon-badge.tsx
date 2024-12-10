import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import {cn} from "@/lib/utils"

const backgroundVariants = cva(
    "rounded-full flex items-center  justify-center",
    {
        variants:{
            variant:{
                default:"bg-sky-100",
                success:"bg-emerald-100"
            },
            iconVariant:{
                default:"text-sky-700",
                success:"text-emerald-700"
            },
            size:{
                default:"p-2",
                sm:"p-1"
            }
        },
        defaultVariants:{
            variant:"default",
            size:"default"

        }
    }
)

const iconVariants = cva(
    "",
    {
        variants:{
            variant:{
                defult:"text-sky-700",
                success:"text-emerald-700",
            },
            size:{
                defult:"h-8 w-8",
                sm:"h-4 w-4"
            }
        },
        defaultVariants:{
            variant:"defult",
            size:"defult"
        }
    }
)
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends  IconVariantsProps{
    icon:LucideIcon,

};
interface IconBadgeProps extends BackgroundVariantsProps{
    
}





//set HTTP-PROXY=http://172.16.0.1:44355
//set HTTPS-PROXY=https://172.16.0.1:44355

//set HTTPS-PROXY=http://10.0.0.1:44355
//set HTTP-PROXY=http://10.0.0.1:44355

//set HTTPS-PROXY=https://192.168.32.17:44355
//set HTTP-PROXY=http://192.168.32.17:44355

//export HTTP_PROXY=http://172.16.0.1:44355
//export HTTPS_PROXY=http://172.16.0.1:44355
