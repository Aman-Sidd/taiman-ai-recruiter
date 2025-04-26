import { BriefcaseBusinessIcon, Calendar,  Code2Icon,  LayoutDashboard, List, Puzzle, Settings, User2Icon, UserCheck, UsersIcon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Scheduled Interviews",
        icon: Calendar,
        href: "/scheduled-interviews",
    },
    {
        label: "All Interviews",
        icon: List,
        href: "/all-interviews",
    },
    {
        label: "Billing",
        icon: WalletCards,
        href: "/billing",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

export const InterviewTypes = [
    {
        title:'Technical',
        icon: Code2Icon
    },
    {
        title:"Behavioural",
        icon: User2Icon
    },
    {
        title:'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title:'Problem Solving',
        icon: Puzzle
    },
    {
        title:'Leadership',
        icon: UserCheck
    }

]

