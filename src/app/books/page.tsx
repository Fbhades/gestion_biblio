"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../Ui/Navbar"; 

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const jsonData = await response.json();
      setData(jsonData as Book[]);
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
  })

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className="container mx-auto mt-32 px-4">
        <div className="flex flex-wrap -mx-4">
          {filteredData.length > 0 ? (
            filteredData.map((book) => (
              <a href="#" className="block px-4 mb-4 w-1/3" key={book.id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    alt=""
                    src={book.image}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mt-4 text-lg font-bold text-gray-900">{book.label}</h3>
                    <p className="mt-2 max-w-sm text-gray-700">{book.author}</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </>
  );
}
