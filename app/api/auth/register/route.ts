import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const existUser = await prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existUser) {
            throw new Error("User already exists");
        }

        const username = body.email.split("@")[0];
        const salt = 10;
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                username,
                password: hashedPassword,
                profile: {
                    create: {
                        fullname: body.fullname,
                    },
                },
            },
        });

        const { password, ...userToSign } = user;
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ ...userToSign, token });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 86400,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "An error occurred" },
            { status: 400 }
        );
    }
}
