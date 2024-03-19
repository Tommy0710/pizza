"use client"
import { useState, useEffect } from 'react';

export const useAuth = (token) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(true);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
    setIsAuthenticated(false);
  }, [token]);

  return { isAuthenticated, loading };
};
