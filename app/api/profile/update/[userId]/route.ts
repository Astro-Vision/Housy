import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { profileSchema } from "@/schema/profile/profile";

const prisma = new PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
    try {
        const formData = await request.formData();
        const images = formData.getAll("image") as File[];
        const body = {
            fullname: formData.get("fullname"),
            image: images,
            phone: formData.get("phone"),
            address: formData.get("address"),
            gender: formData.get("gender")
        }
        const data = profileSchema.parse(body);
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

        await prisma.profile.update({
            where: { userId: parseInt(params.userId) },
            data: {
                fullname: data.fullname,
                image: imageUrls.length > 0 ? imageUrls[0] : null,
                phone: data.phone,
                address: data.address,
                gender: data.gender
            },
        });

        return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({
            message: "Error creating property",
            error: (error as Error).message,
        });
    }
}