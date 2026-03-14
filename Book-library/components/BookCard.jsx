"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, User, BookOpen } from "lucide-react"

export default function BookCard({ book }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Badge variant="secondary" className="mb-2">
              {book.genre}
            </Badge>
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{book.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Details for {book.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={book.cover}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{book.genre}</Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{book.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{book.year}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Classic Literature</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
              <Button className="mt-auto w-fit">Add to Reading List</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
