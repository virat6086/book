// Types
export interface Book {
  id: number
  title: string
  author: string
  description: string
  year: number
  image: string
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "admin" | "user"
}

// Initial Books Data
export const initialBooks: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.",
    year: 1925,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice in the American South during the 1930s.",
    year: 1960,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
    year: 1949,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel about Elizabeth Bennet and Mr. Darcy.",
    year: 1813,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A story about teenage rebellion and alienation.",
    year: 1951,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
  },
]

// Initial Users (Admin credentials: admin@test.com / admin123)
export const initialUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@test.com",
    password: "user123",
    role: "user",
  },
]
