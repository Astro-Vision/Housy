import { z } from "zod";

export const propertySchema = z.object({
    name: z.string().min(4, "Property name is required!"),
    city: z.string().min(4, "City is required!"),
    address: z.string().min(4, "Address is required!"),
    price: z.number().min(1, "Price is required!"),
    image: z.any().optional(),
    typeOfRent: z.enum(["DAY", "MONTH", "YEAR"], {
        message: "Invalid type of rent! Please choose from 'DAY', 'MONTH', or 'YEAR'.",
    }),
    amenities: z.enum(["FURNISHED", "PET_ALLOWED", "SHARED_ACCOMODATION"], {
        message: "Invalid amenities! Please choose from 'FURNISHED', 'PET_ALLOWED', or 'SHARED_ACCOMODATION'.",
    }),
    bedroom: z.number().int().min(1, "Bedroom must be at least 1"),
    bathroom: z.number().int().min(1, "Bathroom must be at least 1"),
});


export type CreatePropertyInput = z.infer<typeof propertySchema>;

export interface PropertyDTO {
    id: number;
    name: string;
    city: string;
    address: string;
    price: number;
    image: string;
    typeOfRent: 'DAY' | 'MONTH' | 'YEAR';
    amenities: 'FURNISHED' | 'PET_ALLOWED' | 'SHARED_ACCOMODATION';
    bedroom: number;
    bathroom: number;
}