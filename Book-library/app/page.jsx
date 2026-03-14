"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import Header from "@/components/Header"
import BookCard from "@/components/BookCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Shield, Sparkles } from "lucide-react"

export default function HomePage() {
  const { user, books, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Your Digital Library
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Discover Your Next
              <span className="text-primary"> Favorite Book</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Explore our curated collection of timeless classics and modern masterpieces.
              Register today to start your reading journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BookVault?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A modern library management system with role-based access and beautiful dark mode support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="p-4 rounded-xl bg-primary/10 w-fit mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Extensive Collection
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Browse through our carefully curated collection of books across multiple genres and time periods.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-colors">
              <div className="p-4 rounded-xl bg-emerald-500/10 w-fit mb-6">
                <Users className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                User Accounts
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Create your personal account to save favorites, track reading history, and more.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-colors">
              <div className="p-4 rounded-xl bg-amber-500/10 w-fit mb-6">
                <Shield className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Admin Control
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Powerful admin dashboard for managing books with full CRUD operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Books
              </h2>
              <p className="text-muted-foreground">
                Explore some of our most popular titles
              </p>
            </div>
            {user && (
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {books.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {!user && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Sign up to access our full library and start reading today
              </p>
              <Link href="/register">
                <Button className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">BookVault</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with React, Next.js, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
