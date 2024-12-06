'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
export default function PropertyPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(event.currentTarget);

    const amenities = ['furnished', 'petAllowed', 'sharedAccommodation'];
    amenities.forEach((amenity) => {
      const checkbox = event.currentTarget.elements.namedItem(
        amenity
      ) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        formData.append('amenities', checkbox.value);
      }
    });

    setLoading(true);
    try {
      const response = await fetch('/api/property/create', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        throw new Error('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Property</h1>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 flex flex-col justify-center"
        >
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name Property</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter property name"
              required
            />
          </div>

          {/* City Selection */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select name="city">
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city1">City 1</SelectItem>
                <SelectItem value="city2">City 2</SelectItem>
                <SelectItem value="city3">City 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter address"
              required
              minLength={4}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Rent Type */}
          <div className="space-y-2">
            <Label htmlFor="typeOfRent">Type of Rent</Label>
            <Select name="typeOfRent">
              <SelectTrigger id="typeOfRent">
                <SelectValue placeholder="Select rent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAY">Day</SelectItem>
                <SelectItem value="MONTH">Month</SelectItem>
                <SelectItem value="YEAR">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex space-x-4 ps-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furnished"
                  name="amenities"
                  value="FURNISHED"
                />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petAllowed"
                  name="amenities"
                  value="PET_ALLOWED"
                />
                <Label htmlFor="petAllowed">Pet Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sharedAccommodation"
                  name="amenities"
                  value="SHARED_ACCOMMODATION"
                />
                <Label htmlFor="sharedAccommodation">
                  Shared Accommodation
                </Label>
              </div>
            </div>
          </div>

          {/* Bedroom Selection */}
          <div className="space-y-2">
            <Label htmlFor="bedroom">Bedroom</Label>
            <Select name="bedroom">
              <SelectTrigger id="bedroom">
                <SelectValue placeholder="Select number of bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathroom Selection */}
          <div className="space-y-2">
            <Label htmlFor="bathroom">Bathroom</Label>
            <Select name="bathroom">
              <SelectTrigger id="bathroom">
                <SelectValue placeholder="Select number of bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Images */}
          <div className="space-y-2">
            <Label htmlFor="image">Property Images</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              multiple
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="w-[300px] place-self-center mt-2"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
}
