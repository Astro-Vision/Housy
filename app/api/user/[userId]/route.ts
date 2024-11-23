import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const userId = parseInt(params.userId);

    if (isNaN(userId)) {
        return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    const user = await prisma.profile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    email: true,
                    username: true,
                    role: true
                }
            }
        }
    });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
