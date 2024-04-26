import React, { useEffect, useState } from 'react';
import { loans } from '../Interface';
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
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> 
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> 
    <tr> 
      <th scope="col" className="px-6 py-3"> loan Date </th> 
      <th scope="col" className="px-6 py-3"> return Date </th> 
      <th scope="col" className="px-6 py-3"> expected Return Date </th> 
      <th scope="col" className="px-6 py-3"> Book Label </th> 
      <th scope="col" className="px-6 py-3"> User email </th> 
    </tr> 
    </thead> 
    <tbody> {loans.map((loan, index) => (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}> 
      <td className="px-6 py-4">{loan.loan_date}</td> 
      <td className="px-6 py-4">{loan.return_date}</td> 
      <td className="px-6 py-4">{loan.expected_return_date}</td> 
      <td className="px-6 py-4">{loan.book_label}</td> 
      <td className="px-6 py-4">{loan.user_email}</td> 
       </tr>))} 
       </tbody> 
       </table>
  );
};