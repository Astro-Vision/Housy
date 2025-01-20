"use client";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { SingleImageDropzone } from '../input-image/single-image';
import { format } from 'date-fns';

export default function TransCard() {
    const pathName = usePathname();
    const [booking, setBooking] = useState<any>(null);
    const [_, setLoading] = useState<boolean>(true);
    const [file, setFile] = useState<File>();
    const [userId, setUserId] = useState<number | null>(null);
    const formatDate = (date: string | null | undefined) => {
        if (!date) return 'Invalid Date';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'Invalid Date';
        return format(parsedDate, 'dd-MM-yyyy');
    };

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
                    setBooking(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                }
            }
        }

        fetchBooking();
    }, [userId])

    const filteredBookings =
        pathName === '/booking'
            ? booking?.filter((invoice: any) => invoice.payment !== 'APPROVE')
            : pathName === '/invoices'
                ? booking?.filter((invoice: any) => invoice.payment === 'APPROVE')
                : pathName === '/transaction'
                    ? booking?.filter((invoice: any) => invoice.payment === 'PROCESS_PAYMENT')
                    : [];

    return (
        <>
            {Array.isArray(filteredBookings) && filteredBookings.length === 0 ? (
                <>
                    {pathName === '/booking' && <p>You don't have any bookings yet.</p>}
                    {pathName === '/invoices' && <p>You don't have any purchases yet.</p>}
                </>
            ) : (
                filteredBookings?.map((invoice: any) => {
                    console.log("invoice", invoice);

                    const id = invoice.id
                    const handlePay = async () => {
                        try {
                            const res = await fetch(`/api/property/booking/payment/${id}`, {
                                method: 'POST'
                            });
                            if (!res.ok) {
                                throw new Error('Failed to initiate payment');
                            }
                            const data = await res.json();
                            console.log('Payment initiated:', data);
                            if (window.snap) {
                                window.snap.pay(data.token, {
                                    onSuccess: function () {
                                        console.log('Payment success');
                                        window.location.href = 'http://localhost:3000/booking';
                                    },
                                    onPending: function () {
                                        console.log('Payment pending');
                                    },
                                    onError: function () {
                                        console.log('Payment error');
                                    },
                                    onClose: function () {
                                        console.log('Payment window closed');
                                    },
                                });
                            }
                        } catch (error) {
                            console.error('Payment failed:', error);
                        }
                    }

                    const handleUploadImage = async () => {
                        const formData = new FormData();
                        if (file) {
                            formData.append("image", file);
                        }

                        try {
                            const response = await fetch(`/api/property/booking/proof/${id}`, {
                                method: "PUT",
                                body: formData,
                            });
                            if (!response.ok) {
                                throw new Error("Failed to update profile");
                            }
                            const updatedProfile = await response.json();
                        } catch (error) {
                            console.error("Error updating profile:", error);
                        }
                    }

                    return (
                        <Card key={invoice.id} className="w-full md:w-[850px] max-w-4xl mx-auto">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <Image
                                            src="/Icon.png"
                                            alt="Housey Logo"
                                            width={90}
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

                                <div className="flex justify-between items-start mb-3 flex-wrap">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <h2 className="text-xl font-bold mb-2">{invoice.property.name}</h2>
                                        <p className="text-sm text-muted-foreground max-w-[300px]">
                                            {invoice.property.address}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className={`mt-2 ${invoice.payment === 'WAITING_PAYMENT'
                                                ? 'bg-red-100 text-red-800'
                                                : invoice.payment === 'PROCESS_PAYMENT'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : invoice.payment === 'APPROVE'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                            {invoice.payment}
                                        </Badge>
                                    </div>
                                    <div className="hidden md:block flex-1">
                                        <div className="grid grid-cols-2 gap-8 mb-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-11">
                                                    <div className="w-2 h-2 rounded-full border border-primary" />
                                                    <div>
                                                        <p className="font-medium">Check-in</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatDate(invoice.checkIn)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    <div>
                                                        <p className="font-medium">Check-out</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatDate(invoice.CheckOut)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="mb-11">
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
                                        <SingleImageDropzone
                                            width={140}
                                            height={140}
                                            value={file}
                                            onChange={(file) => {
                                                setFile(file);
                                            }} />
                                        {/* {invoice.image === null
                                            : <Image
                                                width={140}
                                                height={140}
                                                alt=''
                                                src={invoice.image} />
                                        } */}
                                        <Button className='w-full' onClick={handleUploadImage}>Upload Proof</Button>
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
                                                        <p className={pathName === "/booking" && invoice.payment === "WAITING_PAYMENT"
                                                            ? "text-red-600"
                                                            : invoice.payment === 'PROCESS_PAYMENT'
                                                                ? "text-yellow-600"
                                                                : invoice.payment === 'APPROVE'
                                                                    ? "text-green-600" : ""}>
                                                            Rp. {invoice.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="w-full flex justify-end">
                                    <Button className="w-[20%] text-right" onClick={handlePay}>
                                        Pay
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })
            )}
        </>
    );
}
