"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Users,
  Shield,
  AlertCircle,
  X,
} from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { user, users, books, isLoading, addBook, updateBook, deleteBook } = useAuth()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    year: "",
    genre: "",
    cover: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!formData.year) {
      newErrors.year = "Year is required"
    } else if (isNaN(formData.year) || formData.year < 1000 || formData.year > new Date().getFullYear()) {
      newErrors.year = "Please enter a valid year"
    }
    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      year: "",
      genre: "",
      cover: "",
    })
    setErrors({})
  }

  const handleAdd = () => {
    if (!validateForm()) return

    const cover = formData.cover || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop`

    addBook({
      ...formData,
      year: parseInt(formData.year),
      cover,
    })

    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!validateForm()) return

    const cover = formData.cover || selectedBook.cover

    updateBook(selectedBook.id, {
      ...formData,
      year: parseInt(formData.year),
      cover,
    })

    setIsEditDialogOpen(false)
    setSelectedBook(null)
    resetForm()
  }

  const handleDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook.id)
      setIsDeleteDialogOpen(false)
      setSelectedBook(null)
    }
  }

  const openEditDialog = (book) => {
    setSelectedBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      year: book.year.toString(),
      genre: book.genre,
      cover: book.cover,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (book) => {
    setSelectedBook(book)
    setIsDeleteDialogOpen(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") return null

  const userCount = users.filter((u) => u.role === "user").length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your book library and monitor users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{books.length}</p>
                  <p className="text-sm text-muted-foreground">Total Books</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <Users className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{userCount}</p>
                  <p className="text-sm text-muted-foreground">Registered Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Books Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Book Management</CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="hidden md:table-cell">Year</TableHead>
                    <TableHead className="hidden sm:table-cell">Genre</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="h-12 w-9 overflow-hidden rounded">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell className="hidden md:table-cell">{book.year}</TableCell>
                      <TableCell className="hidden sm:table-cell">{book.genre}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(book)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => openDeleteDialog(book)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new book to the library
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Author *</label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-xs text-destructive">{errors.author}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year *</label>
                <Input
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  className={errors.year ? "border-destructive" : ""}
                />
                {errors.year && (
                  <p className="text-xs text-destructive">{errors.year}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre *</label>
                <Input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Fiction"
                  className={errors.genre ? "border-destructive" : ""}
                />
                {errors.genre && (
                  <p className="text-xs text-destructive">{errors.genre}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                className={`w-full min-h-[80px] rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.description ? "border-destructive" : "border-input"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover URL (optional)</label>
              <Input
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the book details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Author *</label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-xs text-destructive">{errors.author}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year *</label>
                <Input
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  className={errors.year ? "border-destructive" : ""}
                />
                {errors.year && (
                  <p className="text-xs text-destructive">{errors.year}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre *</label>
                <Input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Fiction"
                  className={errors.genre ? "border-destructive" : ""}
                />
                {errors.genre && (
                  <p className="text-xs text-destructive">{errors.genre}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                className={`w-full min-h-[80px] rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.description ? "border-destructive" : "border-input"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover URL (optional)</label>
              <Input
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Book
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedBook?.title}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
