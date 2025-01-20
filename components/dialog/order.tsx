"use client";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Icon } from '@iconify/react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from 'react';

interface OrderProps {
    propertyId: number
}

export default function Order({ propertyId }: OrderProps) {
    const dateInputRef = useRef(null);
    const handleIconClick = () => {
        if (dateInputRef.current) {
            (dateInputRef.current as HTMLInputElement).showPicker();
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    console.log("sasdas",userId);
    
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);

            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [Cookies.get('token')]);

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch(`/api/property/booking/${userId}/${propertyId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ checkIn, checkOut }),
            });
            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || "Failed to log in");
            }
        } catch (err: any) {
            console.log("Something went wrong");
            
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>How long you will stay</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <h1 className="font-bold">Check In</h1>
                    <div className="relative mb-2">
                        <Icon
                            icon="uiw:date"
                            style={{ color: 'black', borderRight: '1px solid #d2d2d2' }}
                            className="absolute pr-2 top-1/2 -translate-y-1/2 text-gray-400 w-8 h-8 cursor-pointer"
                            onClick={handleIconClick} />
                        <input
                            ref={dateInputRef}
                            type="date"
                            value={checkIn.toISOString().slice(0, 10)}
                            onChange={(e) => setCheckIn(new Date(e.target.value))}
                            className="pl-10 pr-10 w-full" />
                        <Icon
                            icon="bxs:down-arrow"
                            style={{ color: 'black' }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer"
                            onClick={handleIconClick} />
                    </div>
                    <h1 className="font-bold">Check Out</h1>
                    <div className="relative mb-2">
                        <Icon
                            icon="uiw:date"
                            style={{ color: 'black', borderRight: '1px solid #d2d2d2' }}
                            className="absolute pr-2 top-1/2 -translate-y-1/2 text-gray-400 w-8 h-8 cursor-pointer"
                            onClick={handleIconClick} />
                        <input
                            ref={dateInputRef}
                            type="date"
                            value={checkOut.toISOString().slice(0, 10)}
                            onChange={(e) => setCheckOut(new Date(e.target.value))}
                            className="pl-10 pr-10 w-full" />
                        <Icon
                            icon="bxs:down-arrow"
                            style={{ color: 'black' }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer"
                            onClick={handleIconClick} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        Order
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
