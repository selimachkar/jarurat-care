import { NextResponse } from "next/server";
import connectToDatabase from '@/Lib/db'; // Import the function
export async function GET() {
    try {
      const db = await connectToDatabase();
      await db.command({ ping: 1 }); // Test the connection
      return NextResponse.json({ message: "Database connection successful!" }, { status: 200 });
    } catch (error) {
      console.error("Database connection test failed:", error);
      return NextResponse.json({ message: "Database connection failed: " + error.message }, { status: 500 }); // Include error message
    }
  } 