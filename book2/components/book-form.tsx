"use client"

import { useState, useEffect } from "react"
import { Book } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookFormProps {
  book?: Book | null
  onSubmit: (book: Omit<Book, "id"> & { id?: number }) => void
  onCancel: () => void
}

export function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [year, setYear] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthor(book.author)
      setDescription(book.description)
      setYear(book.year.toString())
      setImage(book.image)
    }
  }, [book])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!author.trim()) newErrors.author = "Author is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!year.trim()) newErrors.year = "Year is required"
    else if (isNaN(Number(year))) newErrors.year = "Year must be a number"
    if (!image.trim()) newErrors.image = "Image URL is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        id: book?.id,
        title: title.trim(),
        author: author.trim(),
        description: description.trim(),
        year: Number(year),
        image: image.trim(),
      })
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{book ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-sm text-destructive mt-1">{errors.author}</p>}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter book description"
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter publication year"
            />
            {errors.year && <p className="text-sm text-destructive mt-1">{errors.year}</p>}
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
            />
            {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">{book ? "Update" : "Add"} Book</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
