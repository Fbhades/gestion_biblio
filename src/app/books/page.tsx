"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../Ui/Navbar";
import SearchBar from "@/components/searchBar";

interface Book {
  id: number;
  label: string;
  author: string;
  image: string;
}

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Book[]>([]);
  const [filteredData, setFilteredData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const jsonData = await response.json();
      setData(jsonData as Book[]);
      setLoading(false); // Set loading to false when data is received
    };

    fetchData();

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
  }, [searchTerm, data]);



  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-32 px-4 "> {/* Add flex and justify-center to center the search bar */}
        <div className="flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading ? (
          <div className="flex justify-center  h-screen">
            <div className="relative w-32 h-32">
              <div className="animate-spin rounded-full h-full w-full border-t-2 border-b-2 border-blue-300 absolute"></div>
              <span className="absolute inset-0 flex items-center justify-center text-lg text-blue-300 font-bold">Loading</span>
            </div>
          </div>
        ) :

          filteredData.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {filteredData.map((book) => (
                  <a href="#" className=" " key={book.id}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
                      <img
                        alt=""
                        src={book.image}
                        className="h-64 w-full object-cover"
                      />
                      <div className="p-6">
                        <h3 className="mt-4 text-lg font-bold text-gray-900">
                          {book.label}
                        </h3>
                        <p className="mt-2 max-w-sm text-gray-700">{book.author}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p>No books found.</p>
          )}
      </div>
    </>
  );
}
