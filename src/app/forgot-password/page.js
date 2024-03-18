"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircleNotch } from "react-icons/fa6";
export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loginProcess, setloginProcess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)



  const handleFormSubmit = async (ev) => {
    ev.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log(">>> Button");
    setloginProcess(true);
    try {
      // Sử dụng await để chờ kết quả của yêu cầu fetch
      const response = await fetch(
        "http://localhost:8080/reset/forgotPassword",
        {
          method: "POST",
          body: JSON.stringify({ email}),
          headers: { "Content-Type": "application/json" },
        }
      );

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Xử lý kết quả trả về từ server
      const data = await response.json(); // CHuyển đổi định dạng JSON thành định dạng mà js có thể hiểu được
      console.log(data); 

      if (data) {
        toast.success("Wellcome to Pizza App");
      }
    } catch (error) {
      
    } finally{
        setIsSuccess(true)
        setloginProcess(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex items-center flex-col lg:flex-row">
          <form action="" onSubmit={handleFormSubmit} className="flex flex-col">
            <label htmlFor="res-email">Email:</label>
            <input
              type="email"
              name="Email"
              id="res-email"
              disabled={loginProcess}
              placeholder="Email"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />

            <button
              className={
                email
                  ? "button items-center justify-center flex mt-4"
                  : "button mt-4 items-center justify-center flex w-full inactive pointer-events-none"
              }
              type="submit"
              disabled={loginProcess}
            >
              {loginProcess && <FaCircleNotch className="animate-spin mr-4" />}
              Send
            </button>
            {
                isSuccess && <p>Đã gửi email reset password, vui lòng check email</p>
            }
          </form>
      </div>
    </section>
  );
}
