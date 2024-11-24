import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const propertyId = parseInt(params.id);
    const properties = await prisma.property.findUnique({
        where: {
            id: propertyId
        },
        include: {
            image: true
        }
    })
    return NextResponse.json(properties);
}