import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function BookingPage() {
    return (
        <div
            className='flex items-center justify-center pt-9'>
            <Card className='w-[1000px]'>
                <CardHeader className="">
                    <div className="relative flex w-full justify-between">
                        <img src="../../image/Icon.svg" alt="Logo" className="flex-2 w-32" />
                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-2xl">Booking</h1>
                            <h1 className="font-bold text-[#878787]">
                                Satruday
                                <span className="font-normal">, 15 May 2020</span>
                            </h1>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex">
                    <div className="flex-1 pr-3">
                        <h1 className="font-bold">House Astina</h1>
                        <h1 className="">Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren,Tangerang Selatan</h1>
                        <h1 className="text-[#ed8b8b] bg-[#f8ecec] w-fit px-2 py-1">Waiting Payment</h1>
                    </div>
                    <div className="flex-1 pr-3">
                        <h1 className="font-bold">House Astina</h1>
                    </div>
                    <div className="flex-1 pr-3">
                        <h1 className="font-bold">House Astina</h1>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
