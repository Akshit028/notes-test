"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface Category {
    id: string
    name: string
    _count: {
        notes: number
    }
}

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("/api/categories")
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            }
        }

        fetchCategories()
    }, [])

    return (
        <div className="grid gap-4">
            {categories.map((category) => (
                <Card key={category.id} className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {category._count.notes} notes
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="ghost">
                                <Link href={`/notes?category=${category.id}`}>
                                    View Notes
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}