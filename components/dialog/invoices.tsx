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
import { DialogDescription } from '@radix-ui/react-dialog';
import { differenceInDays, format } from 'date-fns';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DialogFooter, DialogHeader } from '../ui/dialog';

interface InvoiceProps {
    id: number;
    onRefresh: () => void;
}

export default function Invoice({ id, onRefresh }: InvoiceProps) {
    const pathName = usePathname();
    const [loading, setLoading] = useState<boolean>(true);
    const [invoice, setInvoice] = useState<any>(null);
    const formatDate = (date: string | null | undefined) => {
        if (!date) return 'Invalid Date';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'Invalid Date';
        return format(parsedDate, 'dd-MM-yyyy');
    };
    const calculateRentDuration = (checkIn: string, checkOut: string) => {
        if (!checkIn || !checkOut) return 0;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        return differenceInDays(checkOutDate, checkInDate);
    };
    const fetchTransaction = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/property/transaction/${id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch booking data');
            }
            const data = await response.json();
            setInvoice(data);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handlePayment = async () => {
        try {
            const response = await fetch(`/api/property/transaction/${id}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }
            await fetchTransaction();
            onRefresh();
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    useEffect(() => {
        fetchTransaction();
    }, [fetchTransaction]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <DialogHeader>
                <DialogDescription className='w-full'>
                    <Card className="mx-auto">
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
                                    <h1 className="text-2xl font-bold mb-1">Booking</h1>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {formatDate(invoice?.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-3">
                                <div className="">
                                    <h2 className="text-xl font-bold mb-2">{invoice?.property.name}</h2>
                                    <p className="text-sm text-muted-foreground max-w-[300px]">
                                        {invoice?.property.address}
                                    </p>
                                    <Badge
                                        variant="secondary"
                                        className={`mt-2 ${invoice?.payment === 'WAITING_PAYMENT'
                                            ? 'bg-red-100 text-red-800'
                                            : invoice?.payment === 'PROCESS_PAYMENT'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : invoice?.payment === 'APPROVE'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                        {invoice?.payment}
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
                                                        {formatDate(invoice?.checkIn)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <div>
                                                    <p className="font-medium">Check-out</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatDate(invoice?.CheckOut)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <p className="font-medium">Amenities</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice?.property.amenities}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium">Type of Rent</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice?.property.typeOfRent}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={invoice?.image}
                                        alt={'proof of transfer'} />
                                    <p className="text-sm text-muted-foreground">Proof of Payment</p>
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
                                                    {invoice?.checkIn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <div>
                                                <p className="font-medium">Check-out</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice?.CheckOut}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-4">
                                            <p className="font-medium">Amenities</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice?.property.amenities}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Type of Rent</p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice?.property.typeOfRent}
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
                                            <TableCell>{invoice?.user.profile.fullname}</TableCell>
                                            <TableCell>{invoice?.user.profile.gender
                                                ? invoice?.user.profile.gender
                                                : "-"}</TableCell>
                                            <TableCell>{invoice?.user.profile.phone
                                                ? invoice?.user.profile.phone
                                                : "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-between">
                                                    <p className="font-medium">Long time rent :</p>
                                                    <p>
                                                        {calculateRentDuration(invoice?.checkIn, invoice?.CheckOut)} days
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="font-medium">Total :</p>
                                                    <p className={pathName === "/booking" && invoice?.payment === "WAITING_PAYMENT"
                                                        ? "text-red-600"
                                                        : invoice?.payment === 'PROCESS_PAYMENT'
                                                            ? "text-yellow-600"
                                                            : invoice?.payment === 'APPROVE'
                                                                ? "text-green-600" : ""}>
                                                        Rp. {invoice?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            {pathName === '/in-transaction' && (
                                <div className="flex justify-end mt-6 gap-3">
                                    <Button className="w-[10%] text-right bg-red-600 font-bold">
                                        Cancel
                                    </Button>
                                    <Button className="w-[10%] text-right bg-green-600 font-bold" onClick={handlePayment}>
                                        Approve
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            </DialogFooter>
        </>
    )
}
