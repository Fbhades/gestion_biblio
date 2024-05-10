"use client"
import React, { useState, useEffect, use } from "react";
import Navbar from "../Ui/Navbar";
import SearchBar from "@/components/searchBar";
import Loading from "@/components/loading"
import { useRouter } from "next/navigation";
import { Book, Category, Sous_Category } from "../Interface";


export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Book[]>([]);
  const [filteredData, setFilteredData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  const [availableCopies, setAvailableCopies] = useState<{ [id: number]: number }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [sousCategories, setSousCategories] = useState<Sous_Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [selectedSousCategory, setSelectedSousCategory] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/books");
      const jsonData = await response.json();
      const promises = (jsonData as Book[]).map(async (book) => {
        const response = await fetch(`/api/books/${book.id_book}/available_copies`);
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
    const fetchCategories = async () => {
      const response = await fetch(`/api/categories`);
      const categories = await response.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSousCategories = async () => {
      const response = await fetch(
        `/api/categories/${selectedCategory}/sousCategories`
      );
      const sousCategories = await response.json();
      setSousCategories(sousCategories);
    };
    fetchSousCategories();
  }, [selectedCategory]);

  useEffect(() => {
    const updateFilteredData = () => {
      if (searchTerm && selectedSousCategory == -1) {
        const filteredBooks = data.filter((book) =>
          book.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredBooks);

      } else if (selectedSousCategory > -1) {
        const filteredBooks = data.filter((book) =>
          book.label.toLowerCase().includes(searchTerm.toLowerCase()) && book.category == selectedSousCategory
        );
        setFilteredData(filteredBooks);
      } else {
        setFilteredData(data);
      }

    };

    updateFilteredData();

  }, [searchTerm, selectedSousCategory]);



  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-32 px-4 ">
        <div className="flex justify-center items-center flex-col">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-min"
              name="big_category"
              required
              onChange={(e) => { setSelectedCategory(parseInt(e.target.value)); setSelectedSousCategory(-1) }}
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
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 ms-2 w-min"
                name="category"
                value={selectedSousCategory}
                onChange={(e) => setSelectedSousCategory(parseInt(e.target.value))}
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
            )}</div>
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