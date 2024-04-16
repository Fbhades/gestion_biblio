import React ,{useEffect, useState} from 'react';
import { Reservation } from '../Interface';

export default function Reservations () {
    const [reservations, setResevations] = useState<Reservation[]>([]);
    const fetchReservatiosn = async () => {
        const response = await fetch("http://localhost:3000/api/reservations");
        const jsonData = await response.json();
        setResevations(jsonData as Reservation[]);
    };
    useEffect(() => {
        fetchReservatiosn();
    }, []);
    return (
    <table>
      <tbody>
        {reservations.map((reservation) => (
          <tr key={reservation.id_reservation}>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.pickup_date}</td>
            <td>{reservation.return_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};