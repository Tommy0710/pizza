"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CartIcon from "./cartIcon"
export default function header() {
    const [isValid, setIsValid] = useState(false);
    async function validateToken(token) {
        try {
            const response = await fetch('/api/token/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Token validation failed');
            }

            const data = await response.json();

            return data.isValid;
        } catch (error) {
            console.error('Error during token validation:', error);
            return false;
        }
    }

    function logout() {
        localStorage.removeItem('userToken');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Gửi token đến backend để xác thực
            validateToken(token)
                .then((isValid) => {
                    if (isValid === "success") {
                        setIsValid(true)
                    }
                })

        }
    }, []); // Chạy một lần sau khi component mount

    return (
        <header className='flex items-center py-4'>
            <Link href={'./'} className='text-primary font-bold flex justify-left text-2xl flex-1'>ST PIZZA</Link>
            <nav className='text-primary items-center flex gap-x-6 flex-1'>
                
            </nav>
            <nav className='text-primary items-center flex justify-end flex-1 gap-x-6 mx-auto'>
                <CartIcon />
                {!isValid ?
                    <div>
                        <Link href={'./login'} className='button mr-3'> Login</Link>
                        <Link href={'./register'}>Register </Link>
                    </div>
                    : <Link onClick={logout} className='button' href={'./login'}> Logout </Link>}
            </nav>
        </header>
    )
}