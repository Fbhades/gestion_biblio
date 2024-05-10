import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../../db';


export async function GET(req: NextRequest, context: any) {
  const id = context.params.id;

  try {
    const client = await pool.connect();
    try {
      if (!id) {
        return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
      }
      const result = await client.query('SELECT * FROM reviews  WHERE book_id = $1', [id]);
      if (result.rowCount === 0) {
        return NextResponse.json({ message: "review not found" }, { status: 404 });
      }
      const reviews = result.rows;
      for (const review of reviews){
      const userResult = await client.query('SELECT first_name, last_name FROM users WHERE id_user = $1', [review.user_id]);
      const name = userResult.rows[0].first_name + ' ' + userResult.rows[0].last_name;
      review.name = name;
      }
      return NextResponse.json(reviews, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500 });
  }
};