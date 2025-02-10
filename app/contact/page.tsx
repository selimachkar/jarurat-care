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
    const [successMessage, setSuccessMessage] = useState<string>(''); 

  
    const handleSubmit = async (e: { preventDefault: () => void; }) => { 
      e.preventDefault();
      setError('');
  
      if (!name || !email || !message) {
        setError("Please fill in all fields.");
        return;
      }
  
      try {
        const response = await fetch('/api/contact', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });
  
        if (response.ok) {
          const responseData = await response.json(); 
          setSubmitted(true);
          setSuccessMessage(responseData.message || "Message submitted successfully!");
          setName('');
          setEmail('');
          setMessage('');
        } else {
          const errorData = await response.json();
          setError(errorData.message || "An error occurred. Please try again later.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
        console.error("Error submitting form:", err);
      }
    };

    if (submitted) {
      return (
        <div className="container h-screen mx-auto p-4 mt-8">
          <h2 className="text-2xl font-bold mb-4">Thank you for your message!</h2>
          <p>{successMessage}</p> 
        </div>
      );
    }

  return (
<section className="py-8"> {/* Add padding for spacing */}
  <div className="container mx-auto relative h-screen"> {/* Center horizontally */}
    <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Contact Us</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>}

      <Form className="w-full input-wrapper max-w-xs mx-auto" onSubmit={handleSubmit} validationBehavior="native">
    <label htmlFor="name">Full Name</label>
      <Input 
        isRequired
        errorMessage="Please enter a valid Full Name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your Name"
        type="text"
        value={name} 
        onValueChange={setName} 
      />
       <label htmlFor="email">Email</label>
      <Input 
        isRequired
        errorMessage="Please enter a valid Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your Email"
        type="email"
        value={email} 
        onValueChange={setEmail} 
      />
        <label htmlFor="message">Message</label>
      <Input 
        labelPlacement="outside"
        name="message"
        placeholder="Enter your Message"
        type="text"
        value={message} 
        onValueChange={setMessage} 
      />
      <Button className='links' type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
    </div>
    </section>
  );
}

function setSuccessMessage(arg0: any) {
  throw new Error('Function not implemented.');
}
