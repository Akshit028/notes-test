import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/lib/auth"
import { SignOut } from "./sign-out"
import { User } from 'lucide-react';



export async function MenuToggle() {
    const session = await auth()

    if (!session?.user) return null
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={session.user.image ?? ""} alt="Avatar" />
                        <AvatarFallback><User strokeWidth={"1px"} /></AvatarFallback>
                    </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                <DropdownMenuItem className="justify-center">
                    <SignOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}