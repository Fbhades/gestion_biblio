import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../../db';
import {User} from '@/app/Interface'

export const GET = async (req: NextRequest) => {
  try {
    const client = await pool.connect();
    try {
      let result = await client.query('SELECT * FROM loans');
      const loans = result.rows;
    
      const fetchedUsers: { [key: number]: User } = {};
      for (const loan of loans) {
        console.log(loan)
        const userId = loan.user_id;
        if (!fetchedUsers[userId]) {
          result = await client.query('SELECT id_user, first_name, last_name, email FROM users WHERE id_user= $1', [userId]);
          fetchedUsers[userId] = result.rows[0];
        }

        // Fetch book label
        result = await client.query('SELECT label FROM books WHERE id_book = (SELECT book_id FROM book_copies WHERE id_copy = $1)', [loan.copy_id]);
        const bookLabel = result.rows[0].label;

        // Add book_label and user_email properties to reservation object
        loan.book_label = bookLabel;
        loan.user_email = fetchedUsers[userId].email;
      }

      return NextResponse.json(loans, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching reservations and users:', error);
    return NextResponse.json({ message: "Error fetching laons" }, { status: 500 });
  }
};