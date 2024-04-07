import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

export const GET = async (req: NextRequest) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      const users = result.rows;
      console.log("Fetched users:", users);
      return NextResponse.json(users, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  try {
    const client = await pool.connect();
    try {
      const body = await req.json();
      const { email, first_name, last_name } = body;
      console.log("Adding user:", body);

      // Input validation
      if (!email || !first_name || !last_name) {
        return NextResponse.json({ body, message: "Missing required fields" }, { status: 400 });
      }

      // Corrected table and column names
      await client.query('INSERT INTO users (email, first_name,last_name, role) VALUES ($1, $2, $3,$4);', [email, first_name, last_name, "admin"]);
      return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ message: "Error adding user" }, { status: 422 });
  }
};
