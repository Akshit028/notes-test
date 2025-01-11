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
        const { name } = body

        const category = await prisma.category.create({
            data: {
                name,
                userId: session.user.id!,
            },
        })

        return NextResponse.json(category)
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

        const categories = await prisma.category.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                _count: {
                    select: {
                        notes: true,
                    },
                },
            },
        })

        return NextResponse.json(categories)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}