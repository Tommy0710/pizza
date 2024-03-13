"use client"
import { useState, useEffect } from 'react';

export const UseAuth = (token) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // nếu data.valid mà === "authen.." thì true
        setIsAuthenticated(data.valid === "authenticated");
      } catch (error) {
        console.error('Verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [token]);

  return { isAuthenticated, loading };
};
