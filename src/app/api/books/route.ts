import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db"; 

export const GET = async (req: NextRequest) => { 
  try {
    const client = await pool.connect(); 
    try {
      const result = await client.query('SELECT * FROM books');
      const books = result.rows;
      console.log("books", books);
      return NextResponse.json(books, { status: 200 });
    } finally {
      await client.release();  
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500 });  
  }
};

export async function POST(req: NextRequest) {
  try {
    const client = await pool.connect(); 
    try {
      const body = await req.json();
      const { label, slug, isbn, description, author } = body;

      // Input validation
      if (!label || !slug || !isbn || !description || !author) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }

      await client.query('INSERT INTO books (label, slug, isbn, description, author) VALUES($1,$2,$3,$4,$5)', [label, slug, isbn, description, author]);  // Removed extra semicolon
      return NextResponse.json({ message: "Book added successfully" }, { status: 201 });
    } finally {
      await client.release();  
    }
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ message: "Error adding book" }, { status: 422 });  
  }
};
