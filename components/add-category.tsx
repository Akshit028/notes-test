"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AddCategory() {
    const router = useRouter()
    const [isAdding, setIsAdding] = useState(false)
    const [name, setName] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            })

            if (response.ok) {
                setName("")
                setIsAdding(false)
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to create category:", error)
        }
    }

    if (!isAdding) {
        return (
            <Button
                onClick={() => setIsAdding(true)}
                className="w-full"
                variant="outline"
            >
                <Plus className="mr-2" />
                Add Category
            </Button>
        )
    }

    return (
        <Card className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
