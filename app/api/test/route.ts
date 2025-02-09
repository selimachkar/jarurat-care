import { NextResponse } from 'next/server';
import connectToDatabase from '@/Lib/db';

export async function GET() {
  try {
    const db = await connectToDatabase();
    await db.command({ ping: 1 });
    return NextResponse.json({ message: "Database connection successful!" }, { status: 200 });
  } catch (error: unknown) { // Type the error as 'unknown'
    if (error instanceof Error) { // Check if it's an Error object
      console.error("Database connection test failed:", error.message); // Access error.message
      return NextResponse.json({ message: "Database connection failed: " + error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred:", error); // Handle other types of errors
      return NextResponse.json({ message: "Database connection failed: An unknown error occurred." }, { status: 500 });
    }
  }
}