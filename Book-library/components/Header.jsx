"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Book, Moon, Sun, LogOut, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Book className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">BookVault</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                {user.role === "admin" ? (
                  <Shield className="h-4 w-4 text-emerald-500" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
              </div>

              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin Panel
                  </Button>
                </Link>
              )}

              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
