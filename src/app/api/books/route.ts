import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

export const GET = async (req: NextRequest) => {
  try {
    const client = await pool.connect();
    try {
      const category = req.nextUrl.searchParams.get('category');
      const author = req.nextUrl.searchParams.get('author');
      let query = 'SELECT * FROM books WHERE 1=1';
      const values = [];
      let paramIndex = 1; // Start parameter index from 1

      // Check if category parameter is provided and is an integer
      if (category && !isNaN(Number(category))) {
        query += ` AND category = $${paramIndex}`;
        values.push(category);
        paramIndex++;
      }

      // Check if author parameter is provided
      if (author) {
        query += ` AND lower(author) LIKE lower($${paramIndex})`;
        values.push(`%${author}%`);
        paramIndex++;
      }

      // Add more parameter checks here...

      const result = await client.query(query, values);
      const books = result.rows;
      if (books.length === 0) {
        return NextResponse.json({ message: "No books found for current filter!" }, { status: 404 });
      }
      return NextResponse.json(books, { status: 200 });
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ status: 500 });
    }
    finally {
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
      const { label, slug, isbn, description, author, category, image, nbrCopies } = body;

      // Input validation
      if (!label || !slug || !isbn || !description || !author || !category || !image || !nbrCopies) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }

      const result = await client.query('INSERT INTO books (label, slug, isbn, description, author, category, image) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id_book;', [label, slug, isbn, description, author, category, image]);
      const bookId = result.rows[0].id_book;

      // Insert copies with status='available'
      for (let i = 0; i < nbrCopies; i++) {
        await client.query('INSERT INTO book_copies (book_id, status) VALUES($1, $2);', [bookId, 'available']);
      }
      return NextResponse.json({ message: "Book added" }, { status: 201 });
    }
    catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error, message: "Internal server error" }, { status: 500 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ message: "Error adding book" }, { status: 422 });
  }
};
