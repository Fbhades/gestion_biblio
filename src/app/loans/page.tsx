'use client'
import React, { useEffect, useState } from 'react';
import { loans } from '../Interface';
import Navbar from '@/app/Ui/Navbar'
import axios from "axios";

export default function Loans() {
  const [loans, setloan] = useState<loans[]>([]);


  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/loans/admin");
      const jsonData = await response.json();
      console.log(jsonData);
      setloan(jsonData as loans[]);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="text-center text-3xl font-semibold mt-20">Liste Des Emprunts</h1>
      <div className="flex justify-center items-center mt-5">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {loans.map((loan, index) => (
            <div className="mb-4" key={index}>
              <div className="p-6 bg-white rounded-lg shadow-md h-full">
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {loan.book_label}
                </h3>
                <img
                  alt={loan.book_label}
                  src={loan.image}
                  className="h-64 w-full object-cover"
                />
                <p className="mt-2 max-w-sm text-gray-700">{new Date(loan.loan_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                {/* Add a badge to display the number of available copies */}
                <p className="mt-2 max-w-sm text-gray-700">{new Date(loan.return_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};