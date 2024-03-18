"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircleNotch } from "react-icons/fa6";
export default function Forgot() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loginProcess, setloginProcess] = useState(false);



  const handleFormSubmit = async (ev) => {
    ev.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log(">>> Button");
    setloginProcess(true);
    try {
      // Sử dụng await để chờ kết quả của yêu cầu fetch
      const response = await fetch(
        "http://localhost:8080/reset/reset_password",
        {
          method: "POST",
          body: JSON.stringify({ 
            password: confirmPassword
        }),
          headers: { "Content-Type": "application/json" },
        }
      );

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Xử lý kết quả trả về từ server
      const data = await response.json(); // CHuyển đổi định dạng JSON thành định dạng mà js có thể hiểu được
      console.log(data); // Log hoặc xử lý dữ liệu nhận được
      // Ví dụ: cập nhật UI hoặc thông báo cho người dùng về việc đăng ký thành công
      if (data) {
        toast.success("Wellcome to Pizza App");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setloginProcess(false);
  };



  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex items-center flex-col lg:flex-row">
          <form action="" onSubmit={handleFormSubmit} className="flex flex-col">
            <label htmlFor="res-email">Email:</label>
            <input
              type="password"
              name="Password"
              disabled={loginProcess}
              placeholder="New Password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <input
              type="password"
              name="Password Confirm"
              disabled={loginProcess}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(ev) => {
                setConfirmPassword(ev.target.value);
              }}
            />

            <button
              className={
                password && confirmPassword 
                  ? "button items-center justify-center flex mt-4"
                  : "button mt-4 items-center justify-center flex w-full inactive pointer-events-none"
              }
              type="submit"
              disabled={loginProcess}
            >
              {loginProcess && <FaCircleNotch className="animate-spin mr-4" />}
              Send
            </button>
          </form>
      </div>
    </section>
  );
}
