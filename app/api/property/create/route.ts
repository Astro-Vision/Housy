import { CreatePropertyInput, propertySchema } from "@/schema/property/property";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const images = formData.getAll("image") as File[];
        const body = {
            name: formData.get("name"),
            city: formData.get("city"),
            address: formData.get("address"),
            price: Number(formData.get("price")),
            typeOfRent: formData.get("typeOfRent"),
            amenities: formData.get("amenities"),
            bedroom: Number(formData.get("bedroom")),
            bathroom: Number(formData.get("bathroom")),
            image: images,
        };
        const data = propertySchema.parse(body);
        const imageUrls: string[] = [];

        for (let i = 0; i < data.image.length; i++) {
            const file = data.image[i];

            if (file) {
                const fileBuffer = Buffer.from(await file.arrayBuffer());
                const base64String = fileBuffer.toString('base64');
                const uploadResponse = await cloudinary.uploader.upload(`data:${file.type};base64,${base64String}`, {
                    folder: process.env.CLOUDINARY_FOLDER,
                    resource_type: "auto",
                });
                imageUrls.push(uploadResponse.secure_url);
            }
        }

        await prisma.property.create({
            data: {
                name: data.name,
                city: data.city,
                address: data.address,
                price: data.price,
                typeOfRent: data.typeOfRent,
                amenities: data.amenities,
                bedroom: data.bedroom,
                bathroom: data.bathroom,
                image: {
                    create: imageUrls.map((url) => ({
                        url,
                    })),
                },
            },
        });

        return NextResponse.json({ message: "Property created successfully!" });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({
            message: "Error creating property",
            error: (error as Error).message,
        });
    }
}
