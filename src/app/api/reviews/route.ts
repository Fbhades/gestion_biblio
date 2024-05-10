import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

export const GET = async (req: NextRequest) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM reviews');
      const users = result.rows;
      console.log("Fetched reviews:", users);
      return NextResponse.json(users, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  try {
    const client = await pool.connect();
    try {
      const body = await req.json();
      const { user_id, book_id, rating, feedback } = body;
      console.log("Adding reviews:", body);

      // Input validation
      //if (!user_id || !book_id || !rating || !feedback) {
       // return NextResponse.json({ body, message: "Missing required fields" }, { status: 400 });
      //}

      // Corrected table and column names
      await client.query('INSERT INTO reviews (user_id, book_id, rating, feedback) VALUES ($1, $2, $3,$4);', [user_id, book_id, rating, feedback]);
      return NextResponse.json({ message: "review added successfully" }, { status: 201 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ message: "Error adding review" }, { status: 422 });
  }
};
