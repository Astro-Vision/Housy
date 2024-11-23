import { z } from "zod";

export const signUpSchema = z.object({
    fullname : z.string().min(4, "Full name is required!"),
    email : z.string().email("Please write your email correctly!"),
    password : z.string().min(4, "Password must be at least 4 characters!"),
});

export type SignUpFormInput = z.infer<typeof signUpSchema>;

export interface SignUpDTO {
    fullname: string;
    email: string;
    password: string;
}