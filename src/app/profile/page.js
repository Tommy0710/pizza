"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import toast from "react-hot-toast";
import { FaCircleNotch } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function ProfileEdit() {
  const path = usePathname();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loginProcess, setloginProcess] = useState(false);
  const [userID, setUserID] = useState(0);
  const [validPass, setValidPass] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setName(userData.data.username);
    // setPassword(userData.data.password)
    setNumber(userData.data.phoneNumber);
    setAddress(userData.data.address);
    setUserID(userData.data.id);
  }, []);
  console.log(userID);

  const handlePassword = (ev) => {
    const inputPassword = ev.target.value;
    setPassword(inputPassword);

    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

    let passwordValid = regex.test(inputPassword);

    // Cập nhật trạng thái lỗi dựa trên kết quả kiểm tra
    setValidPass(passwordValid); // Nếu mật khẩu không hợp lệ, setError sẽ là true
  };

  const handleUpdateProfile = async (ev) => {
    ev.preventDefault();
    setloginProcess(true)
    try {
      const response = await fetch("http://localhost:8080/users/update", {
        method: "PUT",
        body: JSON.stringify({
          userId: userID,
          username: name,
          address,
          phoneNumber: number,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // CHuyển đổi định dạng JSON thành định dạng mà js có thể hiểu được
      console.log(data);
      if (data) {
        toast.success("Successfully update you account");
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
        setloginProcess(false);
    }
  };

  return (
    <>
      <SectionHeaders mainHeader={"Edit Profile"} />
      <UserTabs />
      <h3 className="h3-tab before:w-[120px]">Edit Profile</h3>
      <form
        className="max-w-2xl mx-auto"
        action=""
        onSubmit={handleUpdateProfile}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="font-bold text-sm text-inactive"
                htmlFor="res-password"
              >
                Full Name:
              </label>
              <input
                className=""
                type="text"
                name="Name"
                id="name"
                disabled={loginProcess}
                value={name}
                placeholder="First and Last Name"
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
              />
            </div>
            <div className="flex-1">
              <label className="font-bold text-sm text-inactive">Number:</label>
              <input
                type="number"
                name="phone"
                disabled={loginProcess}
                placeholder="Phone Number"
                value={number}
                onChange={(ev) => {
                  setNumber(ev.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label
              className="font-bold text-sm text-inactive"
              htmlFor="res-password"
            >
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
          </div>
          <div>
            <label
              className="font-bold text-sm text-inactive"
              htmlFor="res-password"
            >
              Address:
            </label>
            <input
              className=""
              type="text"
              name="Address"
              disabled={loginProcess}
              value={address}
              placeholder="Address"
              onChange={(ev) => {
                setAddress(ev.target.value);
              }}
            />
          </div>
        </div>
        <button
          className={
            number && validPass && address && password && name
              ? "button items-center justify-center flex w-full mt-4"
              : "button mt-4 items-center justify-center flex w-full inactive pointer-events-none"
          }
          type="submit"
          disabled={loginProcess}
        >
          {loginProcess && <FaCircleNotch className="animate-spin mr-4" />}
          Update
        </button>
      </form>
    </>
  );
}
