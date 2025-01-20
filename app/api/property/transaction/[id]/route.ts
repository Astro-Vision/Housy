import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const transaction = await prisma.booking.findUnique({
        where: {
            id
        },
        include: {
            property: true,
            user: {
                select: {
                    profile: true
                }
            }
        }
    });
    return NextResponse.json(transaction);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const transaction = await prisma.booking.update({
        where: {
            id
        },
        data: {
            payment: "APPROVE"
        }
    });
    return NextResponse.json(transaction);
}