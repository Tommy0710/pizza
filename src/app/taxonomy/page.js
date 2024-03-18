"use client"
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { UseAuth } from "../components/layout/customHook/auth";
import { FaCircleNotch, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function Taxonomy() {
    const [category, setCategory] = useState("")
    const [processCate, setProcessCate] = useState(false)
    const [validCategory, setValidCategory] = useState(false)
    const [categoryList, setCategoryList] = useState(
        [
            {
                id: 1,
                name: "Tommy",
            },
            {
                id: 2,
                name: "Tommy2",
            },
        ])

    const [token, setToken] = useState("");
    // const navigate = useNavigate()
    const { isAuthenticated, loading } = UseAuth(token)

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setToken(userToken);
        // if (!isAuthenticated.admin === "yes") {
        //     window.location.href = "./login"
        // }
    }, []);

    useEffect(() => {
        try {
            fetch("http://localhost:8080/category/get").then(res => {
                res.json().then(categories => {
                    setCategoryList(categories)
                    console.log(categories)
                });
            });
        }
        catch (error) {
            console.log(error.message)
        }
    }, []);

    if (loading) {
        return <div>Redering...</div>;
    }



    const submitCategory = async (ev) => {
        setProcessCate(true)
        ev.preventDefault();
        try {
            const response = await fetch("./api", {
                method: 'POST',
                body: JSON.stringify({ category }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Xử lý kết quả trả về từ server
            const data = await response.json(); // CHuyển đổi định dạng JSON 

            console.log(data);
            if (data) {
                toast.success('Successfully toasted!')
                try {
                    fetch("http://localhost:8080/category/get").then(res => {
                        res.json().then(categories => {
                            setCategoryList(categories)
                        });
                    });
                }
                catch (error) {
                    console.log(error.message)
                }
                // gọi API lấy danh sách category ở đây
            }
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setProcessCate(false);
        }
    }

    const handleRemove = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8080/category/delete/${categoryId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                setCategoryList(currentList?.filter(category => category.id !== categoryId));
            }
            // Hiển thị thông báo thành công
            toast.success('Category removed successfully!');
        } catch (error) {
            console.error("Failed to remove category:", error);
            // Hiển thị thông báo lỗi
            toast.error('Could not remove category.');
        }
    };


    function handleCategory(ev) {
        ev.preventDefault()
        const category = ev.target.value;
        setCategory(category);

        // Regex kiểm tra chỉ chứa chữ cái và số
        const regex = /^[a-zA-Z0-9]+$/;

        // Kiểm tra category với giá trị từ sự kiện
        let categoryValid = regex.test(category);

        // Cập nhật trạng thái lỗi dựa trên kết quả kiểm tra
        setValidCategory(categoryValid); // Nếu category hợp lệ, setValidCategory sẽ là true
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault();
        }
    }
    function handleEdit(ev) {
        ev.preventDefault
    }
    return (
        <>
            <SectionHeaders mainHeader={"Taxonomy"} />
            <UserTabs />
            <h3 className="h3-tab before:w-[150px]">Add Category</h3>
            <div className="max-w-2xl mx-auto">
                <form action="" onSubmit={submitCategory}>
                    <div className="flex gap-4 m-4">
                        <input
                            className="flex-5"
                            type="text"
                            id="category"
                            value={category}
                            placeholder="Category"
                            onKeyDown={handleKeyDown}
                            onChange={handleCategory} />
                        <button className={validCategory ? "button items-center justify-center flex pointer-events-auto" : "button items-center justify-center flex inactive pointer-events-none"} type="submit" disabled={processCate}>{processCate && <FaCircleNotch className="animate-spin mr-4" />}Add</button>
                    </div>
                </form>
                <div>
                    <ul>
                        {categoryList?.length > 0 ? categoryList.map((categorylist, key) => (
                            <div className="flex justify-between items-center p-2 mb-2 rounded-md bg-slate-200">
                                <li className="text-primary font-bold" key={categorylist.id}>
                                    {categorylist.name}
                                </li>
                                <div className="flex justify-center items-center gap-4">
                                    <button className="button" onClick={handleEdit}><FaPencil /></button>
                                    <button className="button" onClick={() => { handleRemove(categorylist.id) }}><FaRegTrashCan /></button>
                                </div>
                            </div>
                        )) : "Empty Category..."}
                    </ul>
                </div>
            </div>
        </>
    )
}

