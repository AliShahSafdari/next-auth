"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {
            const reqUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            })
            const { user } = await reqUserExists.json();
            if (user) {
                setError("User already Exists");
                // const form = e.target;
                // form.reset()

                return;
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration.", error);
        }

    }

    return (
        <div className=" grid place-items-center h-screen">
            <div className=" shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className=" text-xl font-bold my-4">Register</h1>
                <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button className=" bg-green-600 text-white font-bold
                     cursor-pointer px-6 py-2">Register</button>
                    {error && (
                        <div className=" bg-red-500 text-white w-fit 
                        text-sm py-1 px-3 rounded-md mt-2">{error}
                        </div>)
                    }
                    <Link href={'/'} className=" text-sm mt-3 text-right">
                        Already have an acount?<span className=" underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
