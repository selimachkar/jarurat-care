import { NextResponse, NextRequest } from 'next/server'; 
import connectToDatabase from '@/Lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const contactsCollection = db.collection('contacts'); 
    const data = await req.json(); 
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Please fill in all fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const contact = {
      name,
      email,
      message,
      date: new Date(), 
    };

    const result = await contactsCollection.insertOne(contact);
    console.log("Contact message saved:", result.insertedId);

    return NextResponse.json({ message: "Message submitted successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json({ message: "Failed to submit message. Please try again later." }, { status: 500 });
  }
}