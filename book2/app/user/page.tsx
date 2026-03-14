"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { initialBooks, Book, User } from "@/lib/data"
import { BookCard } from "@/components/book-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut } from "lucide-react"

export default function UserPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)

    // Load books
    const storedBooks = localStorage.getItem("books")
    setBooks(storedBooks ? JSON.parse(storedBooks) : initialBooks)
  }, [router])

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
        <h2 className="text-2xl font-bold mb-6">Browse Books</h2>
        
        {books.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No books available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
