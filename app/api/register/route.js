import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPasswrod = await bcrypt.hash(password,10);

        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Password: ", hashedPasswrod);
        await connectMongoDB();
        await User.create({ name, email, password: hashedPasswrod });

        return NextResponse.json({ message: "User registered." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });

    }
}