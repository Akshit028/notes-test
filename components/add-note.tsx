"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Category {
    id: string
    name: string
}

export function AddNote() {
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [categoryId, setCategoryId] = useState<string>("")
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    categoryId: categoryId || null
                }),
            })

            if (response.ok) {
                setTitle("")
                setContent("")
                setCategoryId("")
                setIsAdding(false)
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to create note:", error)
        }
    }

    if (!isAdding) {
        return (
            <Button
                onClick={() => setIsAdding(true)}
                className="w-full h-24 border-dashed"
                variant="outline"
            >
                <Plus className="mr-2" />
                Add Note
            </Button>
        )
    }

    return (
        <Card className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Textarea
                    placeholder="Note content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                />
                <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsAdding(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Card>
    )
}