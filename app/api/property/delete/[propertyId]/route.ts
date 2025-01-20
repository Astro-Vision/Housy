import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { propertyId: string } }) {
    try {
        const property = await prisma.property.findUnique({
            where: {
                id: parseInt(params.propertyId)
            }
        });

        if(!property) return new Error("Property not found");

        await prisma.property.delete({
            where: {
                id: property.id
            }
        });

        return NextResponse.json({
            message: "Property delete successfully"
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({
            message: "Error creating booking",
            error: (error as Error).message,
        });
    }
}