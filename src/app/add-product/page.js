"use client"
import React, { useEffect, useState } from "react";
import { Listbox } from '@headlessui/react'
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { UseAuth } from "../components/layout/customHook/auth";
import Image from "next/image";
import { FaCircleNotch, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Taxonomy() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Tommy"
        }, 
        {
            id: 2,
            name: "Thiencuteo"
        }]);
    const [isProcessing, setIsProcessing] = useState(false)

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
        try {
            fetch("http://localhost:8080/category/get").then(res => {
                res.json().then(categories => {
                    setCategories(categories)
                });
            });
        }
        catch (error) {
            console.log(error.message)
        }
    }, []);

    // Hàm để xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true)
        try {
            const response = await fetch("./api/", {
                method: 'POST',
                body: JSON.stringify({
                    file: image,
                    productName: productName,
                    description: description,
                    unitPrice: price,
                    productGroupId: category
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                toast.success("Đã thêm sản phẩm thành công")
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        catch (error) {
            toast.error(error.message)
        }
        finally{
            setIsProcessing(false)
        }
    };

    useEffect(() => {
        return () => {
            if (image && typeof image === 'object' && image.preview) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image]);


    const handleImage = (ev) => {
        const file = ev.target.files[0]
        console.log(file)

        file.preview = URL.createObjectURL(file)


        setImage(file)
        console.log(file)
    }
    const handleCategory = (ev) => {
        ev.preventDefault
        setCategory(ev.target.value)
    }

    return (
        <div className="mb-6">
            <SectionHeaders mainHeader={"Add Product"} />
            <UserTabs />
            <h3 className="h3-tab before:w-[140px]">Add Product</h3>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" value={productName} onChange={e => setProductName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={handleCategory}>
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
                        className="min-w-[100px] min-h-[100px] object-contain"
                        width={100}
                        height={100}
                        alt={image.name ?? "Empty Product Image"} ></Image>

                </div>
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input id="stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                </div>
                <button className={productName && price && description && image && category && stock ? "button w-full items-center justify-center flex mt-4" : "button mt-4 items-center justify-center flex w-full inactive pointer-events-none"} type="submit" disabled={isProcessing}>{isProcessing && <FaCircleNotch className="animate-spin mr-4" />}Add Product</button>
            </form>
        </div>
    )
}

