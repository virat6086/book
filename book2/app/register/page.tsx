"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { initialUsers, User } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookOpen } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    // Get existing users
    const storedUsers = localStorage.getItem("users")
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : initialUsers

    // Check if email exists
    if (users.some((u) => u.email === email)) {
      setErrors({ email: "Email already registered" })
      return
    }

    // Create new user
    const newUser: User = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    }

    // Save users
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Auto login
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    router.push(role === "admin" ? "/admin" : "/user")
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Register to access the library</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <Label>Register as</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Admin</span>
                </label>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
