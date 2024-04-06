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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/books");
      const jsonData = await response.json();
      setData(jsonData as Book[]);
      setLoading(false); // Set loading to false when data is received
      // Set filteredData to jsonData as Book[]
      setFilteredData(jsonData as Book[]);
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
      <div className="container mx-auto mt-32 px-4 "> {/* Add flex and justify-center to center the search bar */}
        <div className="flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading ? (
          <Loading />
        ) :

          filteredData.length > 0 ? (
            <>


              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {
                  filteredData.map((book) => (

                    // <Link href={{ pathname: '../page_detail', query: book }}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full" onClick={() => router.push('/books/' + book.id_book)} role="button">
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
                      </div>
                    </div>
                    // </Link>
                  ))
                }
              </div>

            </>
          ) : (
            <p>No books found.</p>
          )}
      </div >
    </>
  );
}