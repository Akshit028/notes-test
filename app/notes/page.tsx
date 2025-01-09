import { SignOut } from "@/components/sign-out";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function notes() {
    const session = await auth()
    if (session?.user) {
        return (
            <div>
                <div>
                    All Notes
                    <UserAvatar />
                    <SignOut />
                </div>
            </div>
        );
    }
}
