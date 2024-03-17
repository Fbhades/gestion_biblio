"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Navbar component
function Navbar() {
  return (
    <nav className="bg-blue-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-24"> {/* Increased height */}
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-20 rtl:space-x-reverse">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ISET RADES</span>
          </a>
          <ul className="flex flex-row items-center space-x-10">
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Accueil</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">À propos</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nos services</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/books" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Livres</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nouveautés</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Contact</a> {/* Black text color, deep blue hover color */}
            </li>
          </ul>
        </div>
        <div className="relative h-full mt-2"> 
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 pointer-events-none" /> {/* Search icon */}
          <input type="text" placeholder="Search..." className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 h-full bg-white dark:bg-gray-800" />
        </div>
        
      </div>
    </nav>
  );
}


// Books component
function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/books');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-32 px-4"> {/* Adjust margin-top to move below the navbar */}
      <div className="flex flex-wrap -mx-4">
        {data?.length > 0 ? (
          data.map((book) => (
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
  );
}

export default function Home() {
  return (
    <div>
      <Navbar />
      <Books />
    </div>
  );
}
