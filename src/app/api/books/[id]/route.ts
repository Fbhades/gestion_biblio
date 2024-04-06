import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../../db';


export async function GET(req: NextRequest, context: any) {
  const id = context.params.id;

  try {
    const client = await pool.connect();
    try {
      if (id === undefined) {
        return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
      }
      const result = await client.query('SELECT * FROM books WHERE id_book = $1', [id]);
      const book = result.rows[0];
      if (!book) {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
      return NextResponse.json(book, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500 });
  }
};

export async function PUT(req: NextRequest, context: any) {
  const id = context.params.id;

  try {
    const client = await pool.connect();
    try {
      if (id === undefined) {
        return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
      }
      const body = await req.json();
      const { label, slug, isbn, description, author, category, image } = body;
      // Input validation
      if (!label || !slug || !isbn || !description || !author || !category || !image) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
      const result = await client.query('UPDATE books SET label = $1, slug = $2, isbn = $3, description = $4, author = $5, category= $7, image = $8 WHERE id_book = $6 ', [label, slug, isbn, description, author, id, category, image]);
      if (result.rowCount === 0) {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Book updated" }, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500 });
  }
};

export async function DELETE(req: NextRequest, context: any) {
  const id = context.params.id;

  try {
    const client = await pool.connect();
    try {
      if (id === undefined) {
        return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
      }
      const result = await client.query('DELETE FROM books WHERE id_book = $1', [id]);
      if (result.rowCount === 0) {
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Book deleted" }, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ status: 500 });
  }
};
