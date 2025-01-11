"use client"

import { SetStateAction, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Trash, X, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface NoteProps {
    note: {
        id: string
        title: string
        content: string
        categoryId: string | null
        category: { id: string; name: string } | null
    }
    onUpdate: (note: any) => void
    onDelete: (id: string) => void
}

export function Note({ note, onUpdate, onDelete }: NoteProps) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/notes/${note.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            })

            if (response.ok) {
                const updatedNote = await response.json()
                onUpdate(updatedNote)
                setIsEditing(false)
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to update note:", error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/notes/${note.id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                onDelete(note.id)
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to delete note:", error)
        }
    }

    if (isEditing) {
        return (
            <Card className="p-4 space-y-4">
                <Input
                    value={title}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <Textarea
                    value={content}
                    onChange={(e: { target: { value: SetStateAction<string> } }) => setContent(e.target.value)}
                    placeholder="Content"
                    rows={4}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleUpdate}>
                        <Check className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {note.content}
                    </p>
                    {note.category && (
                        <span className="text-xs text-muted-foreground mt-2 inline-block">
                            {note.category.name}
                        </span>
                    )}
                </div>
                <div className="flex gap-1">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                    >
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleDelete}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}