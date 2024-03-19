"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import SectionHeaders from "../components/layout/sectionheader";
import { FaCircleNotch } from "react-icons/fa6";
import { increaseQuantity, decreaseQuantity, deleteProduct } from '../../redux/slice/counterSlice'; 

export default function Cart() {
    const [subTotal, setSubTotal] = useState(0);
    const [purchaseProcess, setPurchaseProcess] = useState(false)

    const productCart = useSelector((state) => state.cart.CartArr);

    const dispatch = useDispatch();

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
        
    };
    console.log(productCart)
    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };
    
    const handleDeleteItem = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        productCart.reduce((sum, current) => {
            let total = sum + (current.price * current.quantity);
            setSubTotal(total);
            return total;
        }, 0);
    }, [productCart]);

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(productCart));
      }, [productCart]);

    const handleSubmitCart = async (ev) => {
        setPurchaseProcess(true)
        try {
            ev.preventDefault();
            const response = await fetch('http://localhost:8080/orders/add', {
                method: "POST",
                body: JSON.stringify({
                    userId: 3,
                    quantityPriceList: [
                        { productId: 5, quantity: 5 },
                        { productId: 7, quantity: 5 }
                    ]
                }),
                headers: { "Content-Type": "application/json" },

            })

            // Kiểm tra nếu response không thành công
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Xử lý kết quả trả về từ server
            const data = await response.json();
            console.log(data); // Log hoặc xử lý dữ liệu nhận được
            if (data) {
                toast.success("Order thành công");
                localStorage.removeItem('cartItem')
                setPurchaseProcess(false)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setPurchaseProcess(false)
        }
    }

    //   if (productCart.length === 0) {
    //     <>
    //       <SectionHeaders mainHeader={"Cart Page"} />
    //       <p>No product in cart...</p>
    //     </>;
    //   } else {
    return (
        <div className="max-w-6xl mx-auto mb-6">
            <SectionHeaders mainHeader={"Cart Page"} />
            {/* <caption class="caption-top w-ful">
                    Table 3.1: Professional wrestlers and their signature moves.
                </caption> */}
            <table className="table-auto border-separate border-spacing-6 w-full">
                <thead>
                    <tr className="font-bold text-xl">
                        <th colSpan={3}>Title</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productCart.map((item, index) => (
                        <tr key={index}>
                            <td><button onClick={() => {
                                handleDeleteItem(item.id)
                            }}>X</button></td>
                            <td>
                                <Image src={item.img_url} width={100} height={100} alt="" />
                            </td>
                            <td>
                                {item.title} <br></br> {item.category}
                            </td>
                            <td>{item.description}</td>
                            <td className="flex gap-2 items-center justify-center">
                                <button
                                    className="button"
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                >
                                    -
                                </button>
                                {item.quantity}
                                <button
                                    className="button"
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                >
                                    +
                                </button>
                            </td>
                            <td className="align-top text-center">${item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td colSpan={3} className="font-bold text-xl">
                            Subtotal
                        </td>
                        <td className="align-top text-center">$ {subTotal}</td>
                    </tr>
                </tfoot>
            </table>
            <button
                className="button items-center justify-center flex mt-4"
            type="submit"
            onClick={handleSubmitCart}
            disabled={purchaseProcess}
            >
            {purchaseProcess && <FaCircleNotch className="animate-spin mr-4" />}
            Purchase
        </button>
      </div >
    );
}

