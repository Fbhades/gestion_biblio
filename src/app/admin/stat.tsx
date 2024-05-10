import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ReservationAdmin } from '../Interface';

export default function Stats() {
  const [topBooks, setTopBooks] = useState<{ book_label: string; count: number }[]>([]);
  const [topUsers, setTopUsers] = useState<{ user_email: string; count: number }[]>([]);
  const fetchReservations = async () => {
    const res = await fetch("http://localhost:3000/api/reservations/admin");
    const data = await res.json();
    return data;
  };

  const getTopBooksAndUsers = (reservations: ReservationAdmin[]) => {
    const bookCounts: Record<string, number> = {};
    const userCounts: Record<string, number> = {};

    reservations.forEach((reservation: ReservationAdmin) => {
      if (!bookCounts[reservation.book_label]) {
        bookCounts[reservation.book_label] = 0;
      }
      bookCounts[reservation.book_label]++;

      if (!userCounts[reservation.user_email]) {
        userCounts[reservation.user_email] = 0;
      }
      userCounts[reservation.user_email]++;
    });

    const topBooks = Object.entries(bookCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([book_label, count]) => ({ book_label, count }));

    const topUsers = Object.entries(userCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([user_email, count]) => ({ user_email, count }));

    return { topBooks, topUsers };
  };

  const TopBooks = ({ topBooks }: { topBooks: { book_label: string; count: number }[] }) => {
    return (
      <div>
        {topBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold pb-4 border-b border-gray-200 text-center mt-4">Top 5 Reserved Books</h2>
            <BarChart width={600} height={300} data={topBooks} key={topBooks[0]?.book_label}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="book_label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    );
  };

  const MostActiveUsers = ({ topUsers }: { topUsers: { user_email: string; count: number }[] }) => {
    return (
      <div>
        {topUsers.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold pb-4 border-b border-gray-200 text-center mt-4">Most Active Users</h2>
            <BarChart width={600} height={300} data={topUsers} key={topUsers[0]?.user_email}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="user_email" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await fetchReservations();
      const { topBooks, topUsers } = getTopBooksAndUsers(reservations);
      setTopBooks(topBooks);
      setTopUsers(topUsers);
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4">
      <TopBooks topBooks={topBooks} />
      <MostActiveUsers topUsers={topUsers} />
    </div>
  );
};
