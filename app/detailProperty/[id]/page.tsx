"use client";
import Order from "@/components/dialog/order";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type PropertyFeaturesProps = {
    label: string;
    value: string;
    icon?: string;
};

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ label, value, icon }) => {
    return (
        <div className="property-feature">
            <p className="text-gray-600 text-sm">{label}</p>
            <div className="flex gap-2 items-center justify-start">
                <h3>{value}</h3>
                {icon && <Icon icon={icon} />}
            </div>
        </div>
    );
};

export default function DetailProperty() {
    const params = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [propertyId, setPropertyId] = useState<number>(0);
    function toTitleCase(str: string) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/property/get-by/${params.id}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch property data");
                }
                const data = await response.json();
                setProperty(data);
                setPropertyId(data.id);
            } catch (error) {
                console.error("Error fetching property data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProperty();
    }, [params.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!property) {
        return <p>Property not found.</p>;
    }
    return (
        <div className="bg-gray-100">
            <div className="max-w-screen-lg mx-auto p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50 h-full" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                        </div>
                    </div>
                    <div>
                        <div className="flex w-full justify-between">
                            <h2 className="font-semibold text-4xl my-6">{property.name}</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Icon icon="line-md:close-to-menu-alt-transition" width="28" height="28" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Detail Property</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-xl">
                                    Rp.{property.price.toLocaleString("id-ID")}
                                    <span>
                                        / {property.typeOfRent === "YEAR" ? "Year" : property.typeOfRent === "MONTH" ? "Month" : "Day"}
                                    </span>
                                </h3>
                                <p className="text-gray-600 text-sm w-[80%]">
                                    {[
                                        property.address,
                                        property.province,
                                        property.regency,
                                        property.district,
                                        property.village
                                    ]
                                        .map(item => toTitleCase(item))
                                        .join(', ')}
                                </p>
                            </div>
                            <div className="flex gap-6 items-start">
                                <PropertyFeatures label="Bedrooms" value={property.bedroom} icon="fluent-emoji-high-contrast:bed" />
                                <PropertyFeatures label="Bathrooms" value={property.bathroom} icon="mdi:bathroom" />
                                <PropertyFeatures label="Area" value={property.area} />
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-xl mt-6 mb-2">Description</h2>
                            <p className="text-gray-600 text-sm">
                                <p className="text-gray-800 text-sm">
                                    {property.amenities === "FURNISHED" ? "Furnished" : ""}
                                    {property.amenities === "PET_ALLOWED" ? "Pet Allowed" : ""}
                                    {property.amenities === "SHARED_ACCOMODATION" ? "Shared Accommodation" : ""}
                                </p>
                                {property.description}
                            </p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-[20%] text-right">
                                        Book Now
                                    </Button>
                                </DialogTrigger>
                                <Order propertyId={propertyId} />
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}