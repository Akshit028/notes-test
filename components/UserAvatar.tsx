import { auth } from "@/lib/auth"
import  Image  from "next/image"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null

    return (
        <div>
            {session.user.image && (<Image
                src={session.user.image}
                width={500}
                height={500}
                alt="Picture of the author"
            />)}
        </div>
    )
}