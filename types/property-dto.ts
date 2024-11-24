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