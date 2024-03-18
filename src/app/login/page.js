"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCircleNotch } from "react-icons/fa6";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProcess, setloginProcess] = useState(false);
  const [validPass, setValidPass] = useState(false);

  // useEffect(() => {
  //     const token = localStorage.getItem('userToken')
  //     token && window.location.href('./')
  // })

  const handleFormSubmit = async (ev) => {
    ev.preventDefault(); // Ngăn chặn hành động mặc định của form
    console.log(">>> Button");
    setloginProcess(true);
    try {
      // Sử dụng await để chờ kết quả của yêu cầu fetch
      const response = await fetch(
        "http://localhost:8080/authentication/login",
        {
          method: "POST",
          body: JSON.stringify({ 
            email: email, 
            password: password }),
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
      if (data && data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userID", data.data.id);
        localStorage.setItem("userData", JSON.stringify(data));
        // window.location.href = "/"
        //navigate to home page
        toast.success("Wellcome to Pizza App");
      } else if (data.description === "Login Failed") {
        toast.error("Nhập sai mật khẩu rồi thằng ngu")
      }
    } catch (error) {
      toast.error(error.message);
    }
    setloginProcess(false);
  };

  const handlePassword = (ev) => {
    const inputPassword = ev.target.value;
    setPassword(inputPassword); // Cập nhật trạng thái mật khẩu với giá trị mới

    // Sử dụng biểu thức chính quy mới để kiểm tra
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

    // Kiểm tra mật khẩu với giá trị từ sự kiện
    let passwordValid = regex.test(inputPassword);

    // Cập nhật trạng thái lỗi dựa trên kết quả kiểm tra
    setValidPass(passwordValid); // Nếu mật khẩu không hợp lệ, setError sẽ là true
  };

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex items-center flex-col lg:flex-row">
        <div className="w-full flex-1">
          <Image
            src={"/img/signin.jpg"}
            // objectFit={'cover'}
            className="mx-auto"
            width={"600"}
            height={"600"}
            quality={80}
            alt="Register Image KFC"
          ></Image>
        </div>
        <div className="max-w-[600px] flex-1 pl-0 mt-[40px] w-full lg:pl-[80px] lg:mt-0">
          <form action="" onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="flex">
              <Link href="./register" className="h1-title inactive">
                Register
              </Link>
              <h1 className="h1-title">Login</h1>
            </div>
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
            <label className="mt-2" htmlFor="res-password">
              Password:
            </label>
            <input
              type="password"
              name="Password"
              id="res-password"
              disabled={loginProcess}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            <button
              className={
                email && validPass
                  ? "button items-center justify-center flex mt-4"
                  : "button mt-4 items-center justify-center flex w-full inactive pointer-events-none"
              }
              type="submit"
              disabled={loginProcess}
            >
              {loginProcess && <FaCircleNotch className="animate-spin mr-4" />}
              Login
            </button>
            <p>Forgot your password? <Link href={'./forgot-password/'} className="mt-2 underline decoration-dotted">forgot password</Link></p>
            <div className="border-t border-b my-4 text-center p-2 text-sm">
              or login with provider
            </div>
            <button className="flex items-center justify-center w-full border rounded-full p-1 hover:border-primary">
              <Image
                src={"/img/googleicon.png"}
                alt=""
                width={"32"}
                height={"32"}
              ></Image>
              login with goolge
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
