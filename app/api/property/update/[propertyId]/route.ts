import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { propertyId: string } }) {
    try {
        const body = await req.json();
        const property = await prisma.property.findUnique({
            where: {
                id: parseInt(params.propertyId)
            }
        });

        if (!property) return new Error("Property not found");
        const {
            name,
            description,
            province,
            regency,
            district,
            village,
            address,
            price,
            typeOfRent,
            amenities,
            bedroom,
            bathroom,
            area
        } = body

        await prisma.property.update({
            where: {
                id: property.id
            },
            data: {
                name: body.name,
                description: body.description,
                province: body.province,
                regency: body.regency,
                district: body.district,
                village: body.village,
                address: body.address,
                price: body.price,
                typeOfRent: body.typeOfRent,
                amenities: body.amenities,
                bedroom: body.bedroom,
                bathroom: body.bathroom,
                area: body.area
            }
        });

        return NextResponse.json({
            message: "Property update successfully"
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({
            message: "Error creating booking",
            error: (error as Error).message,
        });
    }
}