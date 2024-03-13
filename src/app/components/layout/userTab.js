"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { UseAuth } from "./customHook/auth";


export default function UserTabs() {
    const path = usePathname()
    const [token, setToken] = useState("");
    // const navigate = useNavigate()

    const { isAuthenticated, loading } = UseAuth(token)
    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken(userToken);
        // if (!isAuthenticated) {
        //     window.location.href = "./login"
        // }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    // const getWidthText = () => {

    // }

    
    console.log(path)
    return (
        <>
            <div className="flex justify-center mb-8 ">
                <div className="flex gap-2 overflow-auto p-2">
                    <Link className={path === '/profile' ?  "button whitespace-nowrap" : "button inactive whitespace-nowrap"} href={"./profile"}>Edit Profile</Link>
                    <Link className={path === '/taxonomy' ?  "button whitespace-nowrap" : "button inactive  whitespace-nowrap"} href={"./taxonomy"}>Taxonomy</Link>
                    <Link className={path === '/add-product' ?  "button whitespace-nowrap" : "button inactive  whitespace-nowrap"} href={"./add-product"}>Add Product</Link>
                    <Link className={path === '/product-all' ?  "button whitespace-nowrap" : "button inactive  whitespace-nowrap"} href={"./product-all"}>All Product</Link>
                </div>
            </div>
        </>
    )
}

