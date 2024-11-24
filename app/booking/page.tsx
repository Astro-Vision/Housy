import TransCard from "@/components/card/trans-card";

export default function BookingPage() {
    return (
        <div className='flex items-center justify-center pt-9'>
            <div className="flex flex-col">
                <TransCard />
                <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Pay
                </button>
            </div>
        </div>
    )
}
