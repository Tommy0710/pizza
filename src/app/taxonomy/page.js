"use client"
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { FaCircleNotch } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Taxonomy() {
    const [category, setCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [processCate, setProcessCate] = useState(false)


    const submitCategory = async (ev) => {
        setProcessCate(true)
        ev.preventDefault();
        try{
            const response = await fetch("./api", {
                method: 'POST',
                body: JSON.stringify({category}),
                headers: { 'Content-Type': 'application/json' }
            })
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Xử lý kết quả trả về từ server
            const data = await response.json(); // CHuyển đổi định dạng JSON 
    
            console.log(data); // Log hoặc xử lý dữ liệu nhận được
            // Ví dụ: cập nhật UI hoặc thông báo cho người dùng về việc đăng ký thành công
            if (data) {
                setCategoryList((prev) => {[...prev, data.name]})
            }
        }
        catch (error) {
            toast.error(error.message)
        }
        setProcessCate(false)
    }

    useEffect(() => {
        // Gọi API lấy danh sách category ở đây
    }, []);

    function handleCategory(ev) {
        setCategory(ev.target.value)
    }

    return (
        <>
            <SectionHeaders mainHeader={"Taxonomy"} />
            <UserTabs />
            <h3 className="h3-tab before:w-[150px]">Add Category</h3>
            <form className="max-w-2xl mx-auto" action="" onSubmit={submitCategory}>
                <div className="flex gap-4 m-4">
                    <input
                        className="flex-5"
                        type="text"
                        id="category"
                        value={category}
                        placeholder="First and Last Name"
                        onChange={handleCategory} />
                    <button className={category ? "button items-center justify-center flex pointer-events-auto" : "button items-center justify-center flex inactive pointer-events-none"} type="submit" disabled={processCate}>{processCate && <FaCircleNotch className="animate-spin mr-4" />}Add</button>
                </div>
            </form>
        </>
    )
}

