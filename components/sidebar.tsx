"use client";
import React, { useRef } from 'react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Icon } from '@iconify/react';
import { Input } from './ui/input';

export default function Sidebar() {
    const dateInputRef = useRef(null);

    const handleIconClick = () => {
        if (dateInputRef.current) {
            (dateInputRef.current as HTMLInputElement).showPicker();
        }
    };
    return (
        <div className="w-[300px] px-4 pt-4">
            <h1 className="font-bold mb-2">Type of Rent</h1>
            <div className="flex w-full gap-4 justify-center mb-2">
                <Button className="w-1/5">Day</Button>
                <Button className="w-1/5">Month</Button>
                <Button className="w-1/5">Year</Button>
            </div>
            <h1 className="font-bold mb-2">Date</h1>
            <div className="relative mb-2">
                <Icon
                    icon="uiw:date"
                    style={{ color: 'black', borderRight: '1px solid #d2d2d2' }}
                    className="absolute pr-2 top-1/2 -translate-y-1/2 text-gray-400 w-8 h-8 cursor-pointer"
                    onClick={handleIconClick} />
                <input
                    ref={dateInputRef}
                    type="date"
                    className="pl-10 pr-10 w-full" />
                <Icon
                    icon="bxs:down-arrow"
                    style={{ color: 'black' }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 cursor-pointer"
                    onClick={handleIconClick} />
            </div>
            <h1 className="font-bold mt-3">Property Room</h1>
            <h2 className="text-[#9c9c9c]">Bedroom</h2>
            <div className="flex w-full gap-4 justify-center mb-2">
                <Button className="w-1/6">1</Button>
                <Button className="w-1/6">2</Button>
                <Button className="w-1/6">3</Button>
                <Button className="w-1/6">4</Button>
                <Button className="w-1/6">5+</Button>
            </div>
            <h2 className="text-[#9c9c9c]">Bathroom</h2>
            <div className="flex w-full gap-4 justify-center mb-4">
                <Button className="w-1/6">1</Button>
                <Button className="w-1/6">2</Button>
                <Button className="w-1/6">3</Button>
                <Button className="w-1/6">4</Button>
                <Button className="w-1/6">5+</Button>
            </div>
            <h1 className="font-bold mb-2">Amenities</h1>
            <div className="flex items-center w-full justify-between mb-2">
                <label
                    htmlFor="furnish"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Furnished
                </label>
                <Checkbox id="furnish" />
            </div>
            <div className="flex items-center w-full justify-between mb-2">
                <label
                    htmlFor="pet"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Pet Allowed
                </label>
                <Checkbox id="pet" />
            </div>
            <div className="flex items-center w-full justify-between mb-2">
                <label
                    htmlFor="share"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Shared Accommodation
                </label>
                <Checkbox id="share" />
            </div>
            <h1 className="font-bold mt-2">Budget</h1>
            <div className="flex items-center justify-between mb-2">
                <h2>Less than IDR.</h2>
                <Input type="search" className="w-1/2" />
            </div>
            <div className="w-full flex justify-end mt-4">
                <Button className="">Apply</Button>
            </div>
        </div>
    );
}
