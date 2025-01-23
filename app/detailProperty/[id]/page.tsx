"use client";
import Order from "@/components/dialog/order";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
    const router = useRouter();
    const params = useParams();
    const [property, setProperty] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [propertyId, setPropertyId] = useState<number>(0);
    const [mainImage, setMainImage] = useState<string>("");
    function toTitleCase(str: string) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    console.log(property);


    const token = Cookies.get("token");
    let userLogin = null;
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                userLogin = decodedPayload;
            }

        } catch (error) {
            console.error('Failed to decode token:', error);
        }
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
                if (data.images && data.images.length > 0) {
                    setMainImage(data.images[0].url);
                }
            } catch (error) {
                console.error("Error fetching property data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProperty();
    }, [params.id]);

    const handleDelete = async () => {
        const response = await fetch(`/api/property/delete/${propertyId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete property");
        }
        toast.success("Property deleted successfully");
        router.push("/");
    }

    if (isLoading) {
        return <div className="w-full flex justify-center items-center h-[300px]">
            <p className="text-gray-500">Loading property...</p>
        </div>;
    }

    if (!property) {
        return <div className="w-full flex justify-center items-center h-[300px]">
            <p>Property not found...</p>
        </div>
    }
    return (
        <div className="bg-gray-100">
            <div className="max-w-screen-lg mx-auto p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="rounded-xl bg-red-400 bg-opacity-50 h-[80%]">
                            {mainImage && <img src={mainImage} alt="Main" className="w-full h-[80%] object-cover rounded-xl" />}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                            {property.image?.map((image: { id: number, url: string }, index: number) => (
                                <div
                                    key={image.id}
                                    className="aspect-video rounded-xl bg-gray-400 bg-opacity-50 cursor-pointer"
                                    onClick={() => setMainImage(image.url)}>
                                    <img src={image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex w-full justify-between">
                            <h2 className="font-semibold text-4xl my-6">{property.name}</h2>
                            {userLogin?.role === "ADMIN" &&
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Icon icon="line-md:close-to-menu-alt-transition" width="28" height="28" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Detail Property</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link className="w-full text-center" href={`/property/${property.id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Button className="w-full" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
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