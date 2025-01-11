import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NoteList } from "@/components/note-list"
import { AddNote } from "@/components/add-note"
import { prisma } from "@/lib/prisma"



export default async function NotesPage({
    searchParams,
}: {
    searchParams: { category?: string }
}) {
    const session = await auth()
    if (!session?.user) {
        redirect("/")
    }

    const category = searchParams.category
        ? await prisma.category.findFirst({
            where: {
                id: searchParams.category,
                userId: session.user.id,
            },
        })
        : null

    return (
        <div className="space-y-4">
            {category && (
                <h2 className="text-xl font-semibold">
                    Notes in {category.name}
                </h2>
            )}
            <AddNote />
            <NoteList categoryId={searchParams.category} />
        </div>
    )
}