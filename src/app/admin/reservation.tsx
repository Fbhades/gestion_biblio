import React, { useEffect, useState } from 'react';
import { ReservationAdmin } from '../Interface';
import axios from "axios";

export default function Reservations() {
  const [reservations, setResevations] = useState<ReservationAdmin[]>([]);
  

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reservations/admin");
      const jsonData = await response.json();
      console.log(jsonData);
      setResevations(jsonData as ReservationAdmin[]);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);
  const onDelete=async (id:any)=>{
    await axios.delete(`http://localhost:3000/api/reservations/${id}`);
    setResevations(reservations.filter((resev) => resev.id_reservation !== id));
  }
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"> 
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> 
    <tr> 
      <th scope="col" className="px-6 py-3"> Reservation Date </th> 
      <th scope="col" className="px-6 py-3"> Pickup Date </th> 
      <th scope="col" className="px-6 py-3"> Return Date </th> 
      <th scope="col" className="px-6 py-3"> Book Label </th> 
      <th scope="col" className="px-6 py-3"> User email </th> 
      <th scope="col" className="px-6 py-3"> Action </th> 
    </tr> 
    </thead> 
    <tbody> {reservations.map((reservation, index) => (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}> 
      <td className="px-6 py-4">{reservation.reservation_date}</td> 
      <td className="px-6 py-4">{reservation.pickup_date}</td> 
      <td className="px-6 py-4">{reservation.return_date}</td> 
      <td className="px-6 py-4">{reservation.book_label}</td> 
      <td className="px-6 py-4">{reservation.user_email}</td> 
      <td><button onClick={()=>onDelete(reservation.id_reservation)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button></td>
       </tr>))} 
       </tbody> 
       </table>
  );
};