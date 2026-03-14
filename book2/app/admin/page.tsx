"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { initialBooks, Book, User } from "@/lib/data"
import { BookCard } from "@/components/book-card"
import { BookForm } from "@/components/book-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, Plus } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  useEffect(() => {
    // Check authentication and admin role
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (parsedUser.role !== "admin") {
      router.push("/user")
      return
    }

    setUser(parsedUser)

    // Load books
    const storedBooks = localStorage.getItem("books")
    setBooks(storedBooks ? JSON.parse(storedBooks) : initialBooks)
  }, [router])

  const saveBooks = (newBooks: Book[]) => {
    setBooks(newBooks)
    localStorage.setItem("books", JSON.stringify(newBooks))
  }

  const handleAddBook = (bookData: Omit<Book, "id"> & { id?: number }) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now(),
    }
    saveBooks([...books, newBook])
    setShowForm(false)
  }

  const handleEditBook = (bookData: Omit<Book, "id"> & { id?: number }) => {
    if (!bookData.id) return
    const updatedBooks = books.map((b) =>
      b.id === bookData.id ? { ...bookData, id: bookData.id } as Book : b
    )
    saveBooks(updatedBooks)
    setEditingBook(null)
    setShowForm(false)
  }

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      saveBooks(books.filter((b) => b.id !== id))
    }
  }

  const openEditForm = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Book Library</h1>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Manage Books</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Book
            </Button>
          )}
        </div>

        {/* Book Form */}
        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleEditBook : handleAddBook}
            onCancel={handleCancel}
          />
        )}

        {/* Books Grid */}
        {books.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No books yet. Add your first book!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isAdmin
                onEdit={openEditForm}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
