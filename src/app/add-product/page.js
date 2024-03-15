"use client"
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { UseAuth } from "../components/layout/customHook/auth";
import Image from "next/image";
import { FaCircleNotch, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Taxonomy() {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const [categories, setCategories] = useState([]);

    const [token, setToken] = useState("");
    // const navigate = useNavigate()
    const { isAuthenticated, loading } = UseAuth(token)

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken(userToken);
        // if (!isAuthenticated.admin === "yes") {
        //     window.location.href = "./login"
        // }

        if (loading) {
            <div>Redering...</div>;
        }
    }, []);

    useEffect(() => {
        // Hàm này sẽ gọi API để lấy danh sách category
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Hàm để xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Logic để gửi dữ liệu sản phẩm mới tới backend...
    };

    useEffect(() => {
        return () => URL.revokeObjectURL(image.preview)
    }, [image])

    const handleImage = (ev) => {
        const file = ev.target.files[0]
        console.log(file)
        
        file.preview = URL.createObjectURL(file) 
        

        setImage(file)
        console.log(file)
    }

    return (
        <>
            <SectionHeaders mainHeader={"Add Product"} />
            <UserTabs />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input id="productName" value={productName} onChange={e => setProductName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="image">Product Image:</label>
                    <input type="file" name="image" id="image" onChange={handleImage} />
                    <Image
                        src={image.preview || "/img/default100.jpg"}
                        width={100}
                        height={100}
                        alt={image.name ?? "Empty Product Image"} ></Image>

                </div>
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input id="stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                </div>
                <button type="submit">Add Product</button>
            </form>
        </>
    )
}

