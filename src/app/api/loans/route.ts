import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

export const GET = async (req: NextRequest) => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM loans');
      const users = result.rows;
      console.log("Fetched loans:", users);
      return NextResponse.json(users, { status: 200 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ message: "Error fetching laons" }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  try {
    const client = await pool.connect();
    try {
      const body = await req.json();
      const { user_id, copy_id, loan_date,expected_return_date,return_date} = body;
      console.log("Adding loan:", body);

      // Input validation
      if (!user_id||!copy_id|| !loan_date||!expected_return_date||!return_date) {
        return NextResponse.json({ body, message: "Missing required fields" }, { status: 400 });
      }
      const result = await client.query("insert into loans (user_id,copy_id,loan_date,expected_return_date,return_date) values ($1,$2,$3,$4,$5);",[user_id,copy_id,loan_date,expected_return_date,return_date]);
      return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } finally {
      await client.release();
    }
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ message: "Error adding user" }, { status: 422 });
  }
};
