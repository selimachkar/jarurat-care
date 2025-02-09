"use client"
import { useState } from 'react';
import {Form} from "@heroui/form";
import { Input } from '@heroui/input';
import { Button

 } from '@heroui/button';
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }


    try {
      const response = await fetch('/api/contact', {  // Replace with your API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json(); // Try to parse error from server
        setError(errorData.message || "An error occurred. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error submitting form:", err);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Thank you for your message!</h2>
        <p>We will get back to you shortly.</p>
      </div>
    );
  }

  return (
<section className="py-8"> {/* Add padding for spacing */}
  <div className="container mx-auto"> {/* Center horizontally */}
    <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Contact Us</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>}

      <Form className="w-full input-wrapper max-w-xs mx-auto" validationBehavior="native">
    <label htmlFor="email">Email</label>
      <Input 
        isRequired
        errorMessage="Please enter a valid email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <Button className='links' type="submit" variant="bordered">
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
    </div>
    </section>
  );
}