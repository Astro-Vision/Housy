import { z } from "zod";

export const propertySchema = z.object({
    name: z.string().min(4, "Property name is required!"),
    description: z.string().min(4, "Description is required!"),
    province: z.string().min(4, "Province is required!"),
    regency: z.string().min(4, "Regency is required!"),
    district: z.string().min(4, "District is required!"),
    village: z.string().min(4, "Village is required!"),
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
    area: z.number().min(1, "Area is required!"),
});

export type CreatePropertyInput = z.infer<typeof propertySchema>;
