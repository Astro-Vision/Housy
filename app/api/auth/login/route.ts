import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: body.usernameOrEmail },
                    { username: body.usernameOrEmail }
                ]
            }
        });
        if (!user) {
            throw new Error('User not found!');
        }
        const isValid = await bcrypt.compare(body.password, user.password);
        if (!isValid) {
            throw new Error('User not found!');
        }
        const { password, ...userToSign } = user;
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );
        return NextResponse.json({ ...userToSign, token });
    } catch (error) {
        return NextResponse.json({ error: "Email must be unique" }, { status: 400 });
    }
}