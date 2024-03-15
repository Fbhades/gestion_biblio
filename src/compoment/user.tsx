"use client";
import { useUser } from "@clerk/clerk-react";
export const handleCreateUser = async () => {
    try {
      const { isLoaded, isSignedIn, user } = useUser();
      const email =user?.emailAddresses;
      const name = user?.fullName;
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email , name}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
  
      const data = await response.json();
      console.log('User created:', data); 
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  