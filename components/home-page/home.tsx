import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'

export default function HomePage() {
    return (
        <div className='pt-3 pl-1 pb-4 grid gap-x-2 gap-y-3 grid-cols-3'>
            <Card className='w-[305px]'>
                <CardHeader className="relative">
                    <h2 className="absolute top-8 left-7 bg-white px-2 py-1 rounded-md text-xs font-bold z-10">
                        Furnished
                    </h2>
                    <img
                        src="https://i.pinimg.com/736x/6b/c0/da/6bc0da6ef0a8a22d8a52cc22d89a718b.jpg"
                        alt="hotel"
                        className="rounded-md"
                    />
                </CardHeader>
                <CardContent>
                    <h1 className="font-bold">Rp.9.000.000 / Year</h1>
                    <h1 className="font-bold text-sm">3 Bed, 2 bath, 1.800 sqft</h1>
                    <h1 className="font-bold text-xs text-[#9c9c9c]">
                        Tanggerang Selatan, Pondok Aren
                    </h1>
                </CardContent>
            </Card>
        </div>
    )
}
