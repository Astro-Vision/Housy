"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';
import { useSearchContext } from '../search';
import Image from 'next/image';

interface Filters {
    typeRent: string;
    bedroom: number;
    bathroom: number;
    furnished: boolean;
    petAllowed: boolean;
    sharedAccomodation: boolean;
    budget: number;
}

export default function PropertyCard({ filters }: { filters: Filters }) {
    const { searchQuery } = useSearchContext();
    const [property, setProperty] = useState<any[]>([]);
    const [filteredProperty, setFilteredProperty] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch('/api/property/get-all', { method: "GET" });
                if (!response.ok) throw new Error("Failed to fetch property data");

                const data = await response.json();
                setProperty(data);
                setFilteredProperty(data);
            } catch (error) {
                console.error("Error fetching property data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperty();
    }, []);

    useEffect(() => {
        const filterData = () => {
            const result = property.filter((prop) => {
                return (
                    (filters.typeRent ? prop.typeOfRent === filters.typeRent : true) &&
                    (prop.bedroom >= filters.bedroom) &&
                    (prop.bathroom >= filters.bathroom) &&
                    (!filters.furnished || prop.amenities.includes("FURNISHED")) &&
                    (!filters.petAllowed || prop.amenities.includes("PET_ALLOWED")) &&
                    (!filters.sharedAccomodation || prop.amenities.includes("SHARED_ACCOMODATION")) &&
                    (filters.budget > 0 ? prop.price <= filters.budget : true) &&
                    (searchQuery ? prop.city.toLowerCase().includes(searchQuery.toLowerCase()) || prop.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                );
            });
            setFilteredProperty(result);
        };

        filterData();
    }, [filters, property, searchQuery]);

    if (filteredProperty.length === 0) {
        return (
            <div className="w-full flex justify-center items-center h-[300px]">
                <p className="text-gray-500">No properties found</p>
            </div>
        )
    }

    return (
        <div className="pt-3 pl-1 pb-4 flex flex-wrap gap-[20px] justify-start">
            {isLoading ? (
                <div className="w-full flex justify-center items-center h-[300px]">
                    <p className="text-gray-500">Loading properties...</p>
                </div>
            ) : (
                filteredProperty.map((data) => (
                    <Link href={'detailProperty/' + data.id} key={data.city} className="cursor-pointer">
                        <Card className="w-[305px] h-[400px]">
                            <CardHeader className="relative h-[280px] ">
                                <h2 className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-bold z-10">
                                    Furnished
                                </h2>
                                <Image
                                    layout="fill"
                                    src={data.image[0].url}
                                    alt={data.name}
                                    className="object-cover px-2"
                                />
                            </CardHeader>
                            <CardContent className='mt-4'>
                                <h1 className="font-bold">
                                    Rp.{data.price.toLocaleString("id-ID")} /
                                    {data.typeOfRent === "YEAR" ? "Year" : data.typeOfRent === "MONTH" ? "Month" : "Day"}
                                </h1>
                                <h1 className="font-bold text-sm">{data.bedroom} Bed, {data.bathroom} Bath</h1>
                                <h1 className="font-bold text-xs text-[#9c9c9c]">
                                    {data.address}
                                </h1>
                            </CardContent>
                        </Card>
                    </Link>
                ))
            )}
        </div>
    );
}
