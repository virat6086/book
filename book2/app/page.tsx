"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { initialUsers } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookOpen } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Get users from localStorage or use initial users
    const storedUsers = localStorage.getItem("users")
    const users = storedUsers ? JSON.parse(storedUsers) : initialUsers

    // Find user
    const user = users.find(
      (u: { email: string; password: string }) => 
        u.email === email && u.password === password
    )

    if (user) {
      // Save current user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user))
      
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/user")
      }
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Book Library</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>

          <div className="mt-6 p-3 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Admin: admin@test.com / admin123</p>
            <p>User: john@test.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
