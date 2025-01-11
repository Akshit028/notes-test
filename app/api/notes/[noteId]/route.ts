import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { noteId: string } }
) {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { title, content, categoryId } = body

        const note = await prisma.note.update({
            where: {
                id: params.noteId,
                userId: session.user.id,
            },
            data: {
                title,
                content,
                categoryId,
            },
        })

        return NextResponse.json(note)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { noteId: string } }
) {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        await prisma.note.delete({
            where: {
                id: params.noteId,
                userId: session.user.id,
            },
        })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}