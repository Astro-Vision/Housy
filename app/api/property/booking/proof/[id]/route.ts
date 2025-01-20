import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const bookingId = parseInt(params.id);
        const formData = await req.formData();
        const image = formData.get("image") as File;

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }
        const fileBuffer = Buffer.from(await image.arrayBuffer());
        const base64String = fileBuffer.toString('base64');
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${image.type};base64,${base64String}`,
            {
                folder: process.env.CLOUDINARY_FOLDER,
                resource_type: "auto",
            }
        );
        await prisma.booking.update({
            where: {
                id: bookingId
            },
            data: {
                image: uploadResponse.secure_url
            }
        })
        return NextResponse.json({ message: "Image uploaded successfully" });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}