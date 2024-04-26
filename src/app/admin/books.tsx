import React, { useState, useEffect } from "react";
import { Book, Category, Sous_Category } from "../Interface";
import axios from "axios";
import { json } from "stream/consumers";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id_book: 0,
    label: "",
    author: "",
    slug: "",
    isbn: 0,
    description: "",
    category: -1,
    image: ""
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [sousCategories, setSousCategories] = useState<Sous_Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [nbrCopies, setNbrCopies] = useState<number>(1);
  const [file, setFile] = useState<File>();

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:3000/api/books");
    const jsonData = await response.json();
    setBooks(jsonData as Book[]);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:3000/api/categories`);
      const categories = await response.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSousCategories = async () => {
      const response = await fetch(
        `http://localhost:3000/api/categories/${selectedCategory}/sousCategories`
      );
      const sousCategories = await response.json();
      setSousCategories(sousCategories);
    };
    fetchSousCategories();
  }, [selectedCategory]);

  const addBook = async () => {
    try {
      const image = await uploadImage();

      const { label, author, isbn, description, category } = newBook;
      console.log("image in new book: " + image);
      const slug = label.toLowerCase().replace(/\s+/g, "-");


      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, slug, isbn, description, author, category, image, nbrCopies })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books after adding.");
      }
      setBooks([newBook, ...books]);
      setNewBook({
        id_book: 0,
        label: "",
        author: "",
        slug: "",
        isbn: 0,
        description: "",
        category: -1,
        image: ""
      });
      setNbrCopies(1);
      setSelectedCategory(-1);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const updateBook = async (id: any, book: any) => {
    await axios.put(`/api/books/${id}`, book);
    //router.push("/admin");
  };

  const deleteBook = async (id: any) => {
    await axios.delete(`/api/books/${id}`);
    setBooks(books.filter((book) => book.id_book !== id));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {

      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,

      });

      if (!response.ok) {
        throw new Error('Failed to upload image.');
      }


      const responseData = await response.json();
      console.log('Image uploaded successfully:', responseData.link);

      return responseData.link
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form className="mb-8" onChange={handleInputChange}>
        <input
          type="text"
          placeholder="Label"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="label"
          required
          value={newBook.label}
        />
        <input type="file" name="file" id="fileInput" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />

        <input
          type="text"
          placeholder="Author"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="author"
          required
          value={newBook.author}
        />
        <input
          type="text"
          placeholder="ISBN"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="isbn"
          required
          value={newBook.isbn}
        />
        <input
          placeholder="Description"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="description"
          required
          value={newBook.description}
        />
        <input
          placeholder="Number of copies"
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="nbrCopies"
          required
          onChange={(e) => setNbrCopies(parseInt(e.target.value))}
          value={nbrCopies}
          type="number"
          min="1"
        />
        <select
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          name="big_category"
          required
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          value={selectedCategory}
        >
          <option disabled selected key={-1} value={-1}>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category.id_cat} value={category.id_cat}>
              {category.label}
            </option>
          ))}
        </select>
        {sousCategories && Array.isArray(sousCategories) && sousCategories.length > 0 && (
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            name="category"
            required value={newBook.category}
          >
            <option disabled selected key={-1} value={-1}>
              Select sub-category
            </option>
            {sousCategories.map((sousCategory) => (
              <option key={sousCategory.id_sous_cat} value={sousCategory.id_sous_cat}>
                {sousCategory.label}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          onClick={addBook}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          disabled={
            !newBook.label ||
            !newBook.author ||
            !newBook.isbn ||
            !newBook.description ||
            !newBook.category ||
            newBook.category === -1 ||
            !nbrCopies ||
            nbrCopies < 1
          }
        >
          Add Book
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div className="bg-white p-4 shadow-md rounded-md ">
            <img src={book.image} alt={book.label} className="w-full h-64" />
            <h2 className="text-xl font-semibold mt-2">{book.label}</h2>
            <p className="text-gray-600">{book.author}</p>
            <div className="flex justify-end mt-4">
              <button
                // onClick={() => updateBook(book.id_book, { ...book, label: "Updated Label" })}
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
  )
}