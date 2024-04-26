"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Books from "@/app/admin/books";
import Reservation from "./reservation";
import Loans from "./laons"
import Stats from "./stat";

export default function Admin() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const email = user?.emailAddresses[0].toString();
  const [currentView, setCurrentView] = useState("books");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/auth/${email}`);
      const jsonData = await response.json();
      if (jsonData.length > 0 && jsonData[0].role !== "admin") {
        router.push("/");
      }
    };
    //*fetchData();
  });

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        Admin Panel
      </h1>
      <Stats />
      <button
        onClick={() => setCurrentView("books")}
        className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2 
              ${currentView === "books" ? "opacity-100" : "opacity-50"} 
              flex-grow`}
        disabled={currentView === "books"}
      >
        Books
      </button>
      <button
        onClick={() => setCurrentView("reservations")}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2
              ${currentView === "reservations" ? "opacity-100" : "opacity-50"} 
              flex-grow`}
        disabled={currentView === "reservations"}
      >
        Reservations
      </button>
      <button
        onClick={() => setCurrentView("loans")}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2
              ${currentView === "loans" ? "opacity-100" : "opacity-50"} 
              flex-grow`}
        disabled={currentView === "loans"}
      >
        loans
      </button>
      {currentView === "books" && <Books />}
      {currentView === "reservations" && <Reservation />}
      {currentView === "loans" && <Loans />}
    </div>
  );
}
