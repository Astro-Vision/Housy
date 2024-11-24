"use client";
import React, { useRef, useState } from 'react';
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

    const [typeRent, setTypeRent] = useState('')
    const [date, setDate] = useState(new Date())
    const [bedroom, setBedroom] = useState(1)
    const [bathroom, setBathroom] = useState(1)
    const [furnished, setFurnished] = useState(false)
    const [petAllowed, setPetAllowed] = useState(false)
    const [sharedAccomodation, setSharedAccomodation] = useState(false)
    const [budget, setBudget] = useState(0);

    const handleTypeRentChange = (e: any) => {
        setTypeRent(e.target.value)
    }

    const handleDateChange = (e: any) => {
        setDate(new Date(e.target.value))
    }

    const handleBedroomChange = (e: any) => {
        setBedroom(parseInt(e.target.value))
    }

    const handleBathroomChange = (e: any) => {
        setBathroom(parseInt(e.target.value))
    }

    const handleFurnishedChange = (e: any) => {
        setFurnished(e.target.checked)
    }

    const handlePetAllowedChange = (e: any) => {
        setPetAllowed(e.target.checked)
    }

    const handleSharedAccomodationChange = (e: any) => {
        setSharedAccomodation(e.target.checked)
    }

    const handleBudgetChange = (e: any) => {
        const value = e.target.value;
        setBudget(value === "" ? 0 : parseInt(value) || 0);
    }

    return (
        <div className="w-[300px] px-4 pt-4">
            <h1 className="font-bold mb-2">Type of Rent</h1>
            <div className="flex w-full gap-4 justify-center mb-2">
                <Button
                    className={`px-4 py-2 w-1/5 rounded-lg ${typeRent === 'Day' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={'Day'}
                    onClick={handleTypeRentChange} >
                    Day</Button>
                <Button
                    className={`px-4 py-2 w-1/5 rounded-lg ${typeRent === 'Month' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={'Month'}
                    onClick={handleTypeRentChange} >
                    Month</Button>
                <Button
                    className={`px-4 py-2 w-1/5 rounded-lg ${typeRent === 'Year' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={'Year'}
                    onClick={handleTypeRentChange}>
                    Year</Button>
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
                <Button
                    className={`w-1/6 ${bedroom === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={1}
                    onClick={handleBedroomChange}>1</Button>
                <Button
                    className={`w-1/6 ${bedroom === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={2}
                    onClick={handleBedroomChange}>2</Button>
                <Button
                    className={`w-1/6 ${bedroom === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={3}
                    onClick={handleBedroomChange}>3</Button>
                <Button
                    className={`w-1/6 ${bedroom === 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={4}
                    onClick={handleBedroomChange}>4</Button>
                <Button
                    className={`w-1/6 ${bedroom === 5 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                    value={5}
                    onClick={handleBedroomChange}>5+</Button>
            </div>
            <h2 className="text-[#9c9c9c]">Bathroom</h2>
            <div className="flex w-full gap-4 justify-center mb-4">
                <div className="flex w-full gap-4 justify-center mb-2">
                    <Button
                        className={`w-1/6 ${bathroom === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        value={1}
                        onClick={handleBathroomChange}>1</Button>
                    <Button
                        className={`w-1/6 ${bathroom === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        value={2}
                        onClick={handleBathroomChange}>2</Button>
                    <Button
                        className={`w-1/6 ${bathroom === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        value={3}
                        onClick={handleBathroomChange}>3</Button>
                    <Button
                        className={`w-1/6 ${bathroom === 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        value={4}
                        onClick={handleBathroomChange}>4</Button>
                    <Button
                        className={`w-1/6 ${bathroom === 5 ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                        value={5}
                        onClick={handleBathroomChange}>5+</Button>
                </div>
            </div>
            <h1 className="font-bold mb-2">Amenities</h1>
            <div className="flex items-center w-full justify-between mb-1">
                <label
                    htmlFor="furnish"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Furnished
                </label>
                <input type="checkbox" className='w-[25x]' id="furnish" checked={furnished} onChange={handleFurnishedChange} />
            </div>
            <div className="flex items-center w-full justify-between mb-1">
                <label
                    htmlFor="pet"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Pet Allowed
                </label>
                <input type="checkbox" className='w-[25x]' id="pet" checked={petAllowed} onChange={handlePetAllowedChange} />
            </div>
            <div className="flex items-center w-full justify-between mb-1">
                <label
                    htmlFor="share"
                    className="text-[#9c9c9c] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Shared Accommodation
                </label>
                <input type="checkbox" className='w-[25x]' id="share" checked={sharedAccomodation} onChange={handleSharedAccomodationChange} />
            </div>
            <h1 className="font-bold mt-2">Budget</h1>
            <div className="flex items-center justify-between mb-2">
                <h2>Less than IDR.</h2>
                <Input type="search" className="w-1/2" value={budget} onChange={handleBudgetChange} />
            </div>
            <div className="w-full flex justify-end mt-4">
                <Button className="">Apply</Button>
            </div>
        </div>
    );
}
