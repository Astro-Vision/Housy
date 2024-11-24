"use client";
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { ITransaction } from '../../app/(admin)/transaction/page';
import { Card, CardContent } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface InvoiceProps {
    id: number;
    propertyName: string;
    address: string;
    invoiceNumber: string;
    date: string;
    checkIn: string;
    checkOut: string;
    amenities: string;
    transactions: ITransaction;
    users: {
        fullname: string;
        gender: 'Male' | 'Female';
        phone: string;
    };
    rentDuration: number;
    total: number;
}

export const invoiceData: InvoiceProps[] = [
    {
        id: 1,
        propertyName: 'House Astina',
        address:
            'Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan',
        invoiceNumber: 'TCK0101',
        date: 'Saturday, 30 March 2020',
        checkIn: '30 March 2020',
        checkOut: '30 March 2021',
        amenities: 'Furnished',
        transactions: {
            id: 1,
            usersName: 'Diaz',
            typeOfRent: 'Year',
            buktiTransfer: 'bca.jpg',
            status: 'Approved',
        },
        users: {
            fullname: 'Diaz',
            gender: 'Male',
            phone: '088123',
        },
        rentDuration: 2,
        total: 3000000,
    },
];

export default function TransCard() {
    const pathName = usePathname();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchBooking = async () => {
            if (userId) {
                try {
                    const response = await fetch(`/api/property/booking/${userId}`, {
                        method: 'GET'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch booking data');
                    }
                    const data = await response.json();
                    console.log('Booking data:', data);

                    setBooking(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            }
        }

        fetchBooking();
    }, [userId])
    return (
        <>
            {booking?.map((invoice: any) => (
                <Card key={invoice.id} className="w-[850px] max-w-4xl mx-auto">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <img
                                    src=""
                                    alt="Housey Logo"
                                    width={120}
                                    height={40}
                                    className="mb-4"
                                />
                            </div>
                            <div className="text-center">
                                {pathName === '/invoices' ? (
                                    <h1 className="text-2xl font-bold mb-1">INVOICE</h1>
                                ) : (
                                    <h1 className="text-2xl font-bold mb-1">Booking</h1>
                                )}
                                <p className="text-sm text-muted-foreground mb-4">
                                    {invoice.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-start mb-3">
                            <div className="">
                                <h2 className="text-xl font-bold mb-2">{invoice.property.name}</h2>
                                <p className="text-sm text-muted-foreground max-w-[300px]">
                                    {invoice.property.address}
                                </p>
                                <Badge
                                    variant="secondary"
                                    className="mt-2 bg-green-100 text-green-800"
                                >
                                    {invoice.payment}
                                </Badge>
                            </div>
                            <div className="hidden md:block">
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full border border-primary" />
                                            <div>
                                                <p className="font-medium">Check-in</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice.checkIn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <div>
                                                <p className="font-medium">Check-out</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice.CheckOut}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-4">
                                            <p className="font-medium">Amenities</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice.property.amenities}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Type of Rent</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice.property.typeOfRent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gray-200 mx-auto mb-2" />
                                <p className="text-sm">{invoice.invoiceNumber}</p>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full border border-primary" />
                                        <div>
                                            <p className="font-medium">Check-in</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice.checkIn}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <div>
                                            <p className="font-medium">Check-out</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice.CheckOut}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <p className="font-medium">Amenities</p>
                                        <p className="text-sm text-muted-foreground">
                                            {invoice.property.amenities}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Type of Rent</p>
                                        <p className="text-sm text-muted-foreground">
                                            {invoice.property.typeOfRent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>{invoice.user.profile.fullname}</TableCell>
                                        <TableCell>{invoice.user.profile.gender}</TableCell>
                                        <TableCell>{invoice.user.profile.phone}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-between">
                                                <p className="font-medium">Long time rent :</p>
                                                <p>
                                                    {invoice.rentDuration}
                                                {/* comment ini nanti checkOut dikurang checkIn */}
                                                </p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="font-medium">Total</p>
                                                <p className={pathName === "/booking" ? "text-red-600" : "text-green-600"}>
                                                    Rp. {invoice.property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
