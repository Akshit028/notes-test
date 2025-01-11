import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { title, content, categoryId } = body

        if (!session.user.id) {
            return new NextResponse("User ID not found", { status: 400 })
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                categoryId,
                userId: session.user.id,
            },
        })

        return NextResponse.json(note)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const notes = await prisma.note.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(notes)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}