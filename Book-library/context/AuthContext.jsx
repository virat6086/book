"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

// Initial static users (admin pre-registered)
const initialUsers = [
  {
    id: 1,
    email: "admin@library.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
]

// Initial static dataset of books
const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American Dream set in the Jazz Age, following the mysterious millionaire Jay Gatsby.",
    year: 1925,
    genre: "Classic Fiction",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and the loss of innocence in the American South.",
    year: 1960,
    genre: "Classic Fiction",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction novel about totalitarianism and surveillance.",
    year: 1949,
    genre: "Science Fiction",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel following the emotional development of Elizabeth Bennet.",
    year: 1813,
    genre: "Romance",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A story about teenage alienation and the pain of growing up.",
    year: 1951,
    genre: "Coming-of-age",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy adventure following Bilbo Baggins on an unexpected journey.",
    year: 1937,
    genre: "Fantasy",
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=300&h=400&fit=crop",
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(initialUsers)
  const [books, setBooks] = useState(initialBooks)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("library_user")
    const storedUsers = localStorage.getItem("library_users")
    const storedBooks = localStorage.getItem("library_books")
    const storedDarkMode = localStorage.getItem("library_darkMode")

    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedUsers) setUsers(JSON.parse(storedUsers))
    if (storedBooks) setBooks(JSON.parse(storedBooks))
    if (storedDarkMode !== null) setDarkMode(JSON.parse(storedDarkMode))

    setIsLoading(false)
  }, [])

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("library_darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  // Save users to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("library_users", JSON.stringify(users))
    }
  }, [users, isLoading])

  // Save books to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("library_books", JSON.stringify(books))
    }
  }, [books, isLoading])

  const register = (email, password, name) => {
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return { success: false, message: "Email already registered" }
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      role: "user",
    }

    setUsers([...users, newUser])
    return { success: true, message: "Registration successful! Please login." }
  }

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password
      setUser(userWithoutPassword)
      localStorage.setItem("library_user", JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    return { success: false, message: "Invalid email or password" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("library_user")
  }

  // CRUD operations for books
  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() }
    setBooks([...books, newBook])
    return newBook
  }

  const updateBook = (id, updatedData) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, ...updatedData } : book)))
  }

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        books,
        isLoading,
        darkMode,
        register,
        login,
        logout,
        addBook,
        updateBook,
        deleteBook,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
