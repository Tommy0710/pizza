"use client"
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/userTab";
import SectionHeaders from "../components/layout/sectionheader";
import { FaCircleNotch } from "react-icons/fa6";
import { usePathname } from 'next/navigation'

export default function ProfileEdit() {
    const path = usePathname()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [validPass, setValidPass] = useState(false)


    const handlePassword = (ev) => {
        const inputPassword = ev.target.value;
        setPassword(inputPassword);

        const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/;

        let passwordValid = regex.test(inputPassword);

        // Cập nhật trạng thái lỗi dựa trên kết quả kiểm tra
        setValidPass(passwordValid); // Nếu mật khẩu không hợp lệ, setError sẽ là true
    }

    return (
        <>
            <SectionHeaders mainHeader={"Edit Profile"} />
            <UserTabs />
            <h3 className="h3-tab before:w-[120px]">Edit Profile</h3>
            <form className="max-w-2xl mx-auto" action="">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="font-bold text-sm text-inactive" htmlFor="res-password">Full Name:</label>
                            <input
                                className=""
                                type="text"
                                name="Name"
                                id="name"
                                value={name}
                                placeholder="First and Last Name"
                                onChange={(ev) => {
                                    setName(ev.target.value)
                                }} />
                        </div>
                        <div className="flex-1">
                            <label className="font-bold text-sm text-inactive" >Email:</label>
                            <input
                                type="email"
                                name="Email"
                                id="res-email"
                                // disabled={loginProcess}
                                placeholder="Email"
                                value={email}
                                onChange={(ev => {
                                    setEmail(ev.target.value)
                                })} />
                        </div>
                    </div>
                    <div>
                        <label className="font-bold text-sm text-inactive" htmlFor="res-password">Password:</label>
                        <input
                            type="password"
                            name="Password"
                            id="res-password"
                            // disabled={loginProcess}
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword} />
                    </div>
                    <div>

                        <label className="font-bold text-sm text-inactive" htmlFor="res-password">Country:</label>
                        <input
                            className=""
                            type="text"
                            name="Country"
                            id="country"
                            value={country}
                            placeholder="Country"
                            onChange={(ev) => {
                                setCountry(ev.target.value)
                            }} />
                    </div>
                    <div>
                        <label className="font-bold text-sm text-inactive" htmlFor="res-password">State:</label>

                        <input
                            className=""
                            type="text"
                            name="State"
                            id="state"
                            value={state}
                            placeholder="State"
                            onChange={(ev) => {
                                setState(ev.target.value)
                            }} />
                    </div>
                    <div>

                        <label className="font-bold text-sm text-inactive" htmlFor="res-password">Address:</label>
                        <input
                            className=""
                            type="text"
                            name="Address"
                            id="address"
                            value={address}
                            placeholder="Address"
                            onChange={(ev) => {
                                setAddress(ev.target.value)
                            }} />
                    </div>
                    <div>

                        <label className="font-bold text-sm text-inactive" htmlFor="res-password">Zip:</label>
                        <input
                            className=""
                            type="text"
                            name="Zip"
                            id="zip"
                            value={zip}
                            placeholder="Zip Code"
                            onChange={(ev) => {
                                setZip(ev.target.value)
                            }} />
                    </div>
                </div>
                <button className="w-full button items-center justify-center flex my-4 " type="submit"> <FaCircleNotch className="animate-spin mr-4" />Save</button>
            </form>
        </>
    )
}

