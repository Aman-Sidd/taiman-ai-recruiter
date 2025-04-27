"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Image from "next/image"
import { SidebarOptions } from "@/services/Constants"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
    return (
        <Sidebar>
            <SidebarHeader className="flex items-center justify-center">
                <Image src={"/full_logo.png"} alt="logo" width={100} height={100} />
                <Button onClick={()=>router.push('/dashboard/create-interview')} className="w-full mt-5"><Plus/>Create New Interview</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {SidebarOptions.map((option, index) => (
                            <SidebarMenuItem key={index} className="p-1">
                                <SidebarMenuButton asChild className={`p-5 ${pathname==option.href && "bg-gray-100"}`}>
                                    <Link href={option.href}>
                                        <option.icon className={`${pathname==option.href && "text-blue-500"}`}/>
                                        <span className={`text-[16px] ${pathname==option.href ? "text-blue-500" : "text-gray-500"}`}>{option.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
  