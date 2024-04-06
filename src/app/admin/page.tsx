"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Book {
  id_book: number;
  label: string;
  author: string;
  slug: string;
  isbn: number;
  description: string;
  image?: string;
  category: number;
}

export default function Admin() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const email = user?.emailAddresses[0].toString();
  const [newBook, setNewBook] = useState<Book>({ id_book: 0, label: "", author: "", slug: "", isbn: 0, description: "yyy", category: 1, image: "https://via.placeholder.com/150" });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/auth/${email}`);
      const jsonData = await response.json();
      console.log(jsonData[0].role);
      if (jsonData[0].role != "admin") {
        router.push("/");
      }
    };

    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const jsonData = await response.json();
      setBooks(jsonData as Book[]);
    };

    fetchData();
    fetchBooks();
  }, [email, newBook]);

  const addBook = async () => {
    try {
      const { label, author, isbn, description } = newBook;
      const slug = label.toLowerCase().replace(/\s+/g, '-');

      console.log(label, "auth", author, isbn, "desc", description, "slug is", slug)
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, slug, isbn, description, author, category: 1, image: "https://via.placeholder.com/150" }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books after adding.");
      }
      // const updatedBooks = await response.json();
      setBooks([newBook, ...books]);
      setNewBook({ id_book: 0, label: "", author: "", slug: "", isbn: 0, description: "", category: 1, image: "https://via.placeholder.com/150" });
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const updateBook = async (id: any, book: any) => {
    await axios.put(`/api/books/${id}`, book);
    router.push("/admin");
  };

  const deleteBook = async (id: any) => {
    await axios.delete(`/api/books/${id}`);
    setBooks(books.filter((book) => book.id_book !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <form className="mb-8">
        <input
          type="text"
          placeholder="Label"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="label"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Author"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="author"
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={addBook}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Book
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div className="bg-white p-4 shadow-md rounded-md">
            <img src={book.image} alt={book.label} className="w-full h-auto" />
            <h2 className="text-xl font-semibold mt-2">{book.label}</h2>
            <p className="text-gray-600">{book.author}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => updateBook(book.id_book, { ...book, label: "Updated Label" })}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteBook(book.id_book)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
