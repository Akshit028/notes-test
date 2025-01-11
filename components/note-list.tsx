"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Note } from "./note"
//
interface NoteType {
    id: string
    title: string
    content: string
    categoryId: string | null
    category: { id: string; name: string } | null
}

export function NoteList({categoryId}: {categoryId?: string}) {
    const [notes, setNotes] = useState<NoteType[]>([])

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch("/api/notes")
            if (response.ok) {
                const data = await response.json()
                setNotes(data)
            }
        }

        fetchNotes()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    onUpdate={(updatedNote: NoteType) => {
                        setNotes(notes.map((n) =>
                            n.id === updatedNote.id ? updatedNote : n
                        ))
                    }}
                    onDelete={(id: string) => {
                        setNotes(notes.filter((n) => n.id !== id))
                    }}
                />
            ))}
        </div>
    )
}