"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link';

export default function HomePage() {
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch('/api/property/get-all', {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch property data");
                }
                const data = await response.json();
                console.log("Property data:", data);
                setProperty(data);
            } catch (error) {
                console.error("Error fetching property data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProperty();
    }, []);

    return (
        <div className='pt-3 pl-1 pb-4 grid gap-x-2 gap-y-3 grid-cols-3'>
            {property && property.map((data: any) => (
                <Link href={'detailProperty/' + data.id} key={data.id} className={'cursor-pointer'}>
                    <Card className='w-[305px]'>
                        <CardHeader className="relative">
                            <h2 className="absolute top-8 left-7 bg-white px-2 py-1 rounded-md text-xs font-bold z-10">
                                Furnished
                            </h2>
                            <img
                                src={data.image[0].url}
                                alt={data.name}
                                className="rounded-md w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardContent>
                            <h1 className="font-bold">
                                Rp.{data.price.toLocaleString("id-ID")} /
                                {data.typeOfRent === "YEAR" ? "Year" : data.typeOfRent === "MONTH" ? "Month" : "Day"}</h1>
                            <h1 className="font-bold text-sm">{data.bedroom} Bed, {data.bathroom} bath, 1.800 sqft</h1>
                            <h1 className="font-bold text-xs text-[#9c9c9c]">
                                {data.address}
                            </h1>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
