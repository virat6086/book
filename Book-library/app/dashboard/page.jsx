"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Header from "@/components/Header"
import BookCard from "@/components/BookCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Filter, X } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, books, isLoading } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])

  // Get unique genres
  const genres = [...new Set(books.map((book) => book.genre))]

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    let result = books

    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedGenre) {
      result = result.filter((book) => book.genre === selectedGenre)
    }

    setFilteredBooks(result)
  }, [books, searchTerm, selectedGenre])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Discover your next favorite book from our collection
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{books.length}</p>
                <p className="text-sm text-muted-foreground">Total Books</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <Filter className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{genres.length}</p>
                <p className="text-sm text-muted-foreground">Genres</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Search className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredBooks.length}</p>
                <p className="text-sm text-muted-foreground">Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGenre === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre("")}
            >
              All
            </Button>
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedGenre) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              </Badge>
            )}
            {selectedGenre && (
              <Badge variant="secondary" className="gap-1">
                Genre: {selectedGenre}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedGenre("")}
                />
              </Badge>
            )}
          </div>
        )}

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
