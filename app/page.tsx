"use client";
import PropertyCard from "@/components/card/property-card";
import { useState } from "react";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Home() {
  const [typeRent, setTypeRent] = useState<string>('');
  const [bedroom, setBedroom] = useState<number>(1);
  const [bathroom, setBathroom] = useState<number>(1);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [petAllowed, setPetAllowed] = useState<boolean>(false);
  const [sharedAccomodation, setSharedAccomodation] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(0);

  const handleTypeRentChange = (type: string) => setTypeRent(type);

  return (
    <div className="flex">
      <div className="w-[300px] h-[90vh] overflow-hidden sticky top-0 mr-2 border-r border-gray-300">
        <div className="w-[300px] px-4 pt-4">
          <h1 className="font-bold mb-2">Type of Rent</h1>
          <div className="flex w-full gap-4 mb-4">
            {['DAY', 'MONTH', 'YEAR'].map((type) => (
              <Button
                key={type}
                className={`w-1/3 px-4 py-2 ${typeRent === type ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleTypeRentChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <h1 className="font-bold">Property Room</h1>
          <h2 className="text-gray-500">Bedroom</h2>
          <div className="flex w-full gap-4 mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                className={`w-1/5 ${bedroom === num ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setBedroom(num)}
              >
                {num}
              </Button>
            ))}
          </div>
          <h2 className="text-gray-500">Bathroom</h2>
          <div className="flex w-full gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                className={`w-1/5 ${bathroom === num ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setBathroom(num)}
              >
                {num}
              </Button>
            ))}
          </div>
          <h1 className="font-bold">Amenities</h1>
          {[
            { label: 'Furnished', value: furnished, onChange: setFurnished },
            { label: 'Pet Allowed', value: petAllowed, onChange: setPetAllowed },
            { label: 'Shared Accommodation', value: sharedAccomodation, onChange: setSharedAccomodation },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <label className="text-gray-500">{item.label}</label>
              <input
                type="checkbox"
                checked={item.value}
                onChange={(e) => item.onChange(e.target.checked)}
              />
            </div>
          ))}
          <h1 className="font-bold mt-4">Budget</h1>
          <div className="flex items-center justify-between">
            <h2>Less than IDR</h2>
            <Input
              type="search"
              className="w-1/2"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 h-[90vh] overflow-y-auto">
        <PropertyCard
          filters={{
            typeRent,
            bedroom,
            bathroom,
            furnished,
            petAllowed,
            sharedAccomodation,
            budget,
          }}
        />
      </div>
    </div>
  );
}
