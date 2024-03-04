"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from 'react';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleFormSubmit(ev) {
        ev.preventDefault(); // ngăn chặn hành động mặt định của button
        fetch('./api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <section className="max-w-6xl mx-auto">
            <div className="flex items-center flex-col lg:flex-row">
                <div className="w-full flex-1">
                    <Image
                        src={"/img/signin.jpg"}
                        objectFit={'cover'}
                        className="mx-auto"
                        width={'600'}
                        height={'600'}
                        quality={80}
                        alt="Register Image KFC"
                    >
                    </Image>
                </div>
                <div className="max-w-[600px] flex-1 pl-0 mt-[40px] w-full lg:pl-[80px] lg:mt-0">
                    <form action="" onSubmit={handleFormSubmit} className="flex flex-col">
                        <div className="flex">
                            <h1 className="h1-title">
                                Register
                            </h1>
                            <Link href="./login" className="h1-title inactive">Login</Link>
                        </div>
                        <label htmlFor="res-email">Email:</label>
                        <input type="email" name="Email" id="res-email" placeholder="Email" value={email} onChange={(ev => {
                            setEmail(ev.target.value)
                        })} />
                        <label className="mt-2" htmlFor="res-password">Password:</label>
                        <input type="password" name="Password" id="res-password" placeholder="Password" value={password} onChange={ev => {
                            setPassword(ev.target.value)
                        }} />
                        <button className="button mt-4" type="submit">Register</button>
                        <div className="border-t border-b my-4 text-center p-2 text-sm">or login with provider</div>
                        <button className="flex items-center justify-center w-full border rounded-full p-1 hover:border-primary">
                            <Image src={"/img/googleicon.png"} alt="" width={'32'} height={'32'}></Image>
                            login with goolge</button>
                    </form>
                </div>

            </div>

        </section>
    )
}