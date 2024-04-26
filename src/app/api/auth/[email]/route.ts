import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../../db"; 

export const GET = async (req: NextRequest , context : any) => {
  const email = context.params.email;
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users where email = $1', [email]);
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