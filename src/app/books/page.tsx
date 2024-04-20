"use client"
import React, { useState, useEffect, use } from "react";
import Navbar from "../Ui/Navbar";
import SearchBar from "@/components/searchBar";
import Loading from "@/components/loading"
import { useRouter } from "next/navigation";
interface Book {
  id_book: number;
  label: string;
  author: string;
  image: string;
}

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Book[]>([]);
  const [filteredData, setFilteredData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  const [availableCopies, setAvailableCopies] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const jsonData = await response.json();
      const promises = (jsonData as Book[]).map(async (book) => {
        const response = await fetch(`http://localhost:3000/api/books/${book.id_book}/available_copies`);
        const jsonData = await response.json();
        return { id: book.id_book, available_copies: jsonData.available_copies };
      });
      const results = await Promise.all(promises);
      const copies = results.reduce<{ [key: number]: number }>((acc, curr) => {
        acc[curr.id] = curr.available_copies;
        return acc;
      }, {})
      setAvailableCopies(copies);
      setData(jsonData as Book[]);
      setFilteredData(jsonData as Book[]);
      setLoading(false); // Set loading to false when data is received
    };
    fetchData();
  }, []);


  useEffect(() => {
    const updateFilteredData = () => {
      if (searchTerm) {
        const filteredBooks = data.filter((book) =>
          book.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredBooks);
      } else {
        setFilteredData(data);
      }
    };

    updateFilteredData();

  }, [searchTerm]);



  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-32 px-4 ">
        <div className="flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading ? (
          <Loading />
        ) :

          filteredData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
              {
                filteredData.map((book) => (
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full relative" onClick={() => router.push('/books/' + book.id_book)} role="button">
                    <img
                      alt={book.label}
                      src={book.image}
                      className="h-64 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="mt-4 text-lg font-bold text-gray-900">
                        {book.label}
                      </h3>
                      <p className="mt-2 max-w-sm text-gray-700">{book.author}</p>
                      {/* Add a badge to display the number of available copies */}
                      <span className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                        {availableCopies[book.id_book] || 0} available
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <p>No books found.</p>
          )
        }
      </div >
    </>
  );
}