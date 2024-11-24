import { z } from "zod";

export const profileSchema = z.object({
    fullname: z.string().min(4, "Full name is required!"),
    phone: z.string().min(4, "Phone number is required!"),
    address: z.string().min(4, "Address is required!"),
    image: z.any().optional(),
    gender: z.enum(["MALE", "FEMALE"], {
        message: "Invalid type of rent! Please choose from 'MALE' or 'FEMALE'.",
    }),
});

export type UpdateProfileInput = z.infer<typeof profileSchema>;