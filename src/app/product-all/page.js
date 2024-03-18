"use client"
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { UseAuth } from "../components/layout/customHook/auth";
import { FaCircleNotch, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Taxonomy() {
    const [token, setToken] = useState("");
    const [allProduct, setAllProduct] = useState([]);
    // const navigate = useNavigate()
    const { isAuthenticated, loading } = UseAuth(token)

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken(userToken);
        // if (!isAuthenticated.admin === "yes") {
        //     window.location.href = "./login"
        // }
    }, []);

    if (loading) {
        return <div>Redering...</div>;
    }

    return (
        <>
            <SectionHeaders mainHeader={"Taxonomy"} />
            <UserTabs />
            
        </>
    )
}

