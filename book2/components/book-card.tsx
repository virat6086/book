"use client"

import Image from "next/image"
import { Book } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface BookCardProps {
  book: Book
  isAdmin?: boolean
  onEdit?: (book: Book) => void
  onDelete?: (id: number) => void
}

export function BookCard({ book, isAdmin, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg leading-tight">{book.title}</h3>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{book.description}</p>
        <p className="text-xs text-muted-foreground mt-2">Published: {book.year}</p>
        
        {isAdmin && (
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(book)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(book.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
