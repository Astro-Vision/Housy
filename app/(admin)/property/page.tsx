import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import React from 'react';

export default function PropertyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Property</h1>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form className="space-y-2 flex flex-col justify-center">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name Property</Label>
            <Input id="name" placeholder="Enter property name" />
          </div>

          {/* City Selection */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select>
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
            <Textarea id="address" placeholder="Enter address" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter price" />
          </div>

          {/* Rent Type */}
          <div className="space-y-2">
            <Label htmlFor="rentType">Type of Rent</Label>
            <Select>
              <SelectTrigger id="rentType">
                <SelectValue placeholder="Select rent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Day">Day</SelectItem>
                <SelectItem value="Week">Week</SelectItem>
                <SelectItem value="Month">Month</SelectItem>
                <SelectItem value="Year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex space-x-4 ps-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="furnished" />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="petAllowed" />
                <Label htmlFor="petAllowed">Pet Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sharedAccommodation" />
                <Label htmlFor="sharedAccommodation">Shared Accommodation</Label>
              </div>
            </div>
          </div>

          {/* Bedroom Selection */}
          <div className="space-y-2">
            <Label htmlFor="bedroom">Bedroom</Label>
            <Select>
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
            <Select>
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

          {/* Save Button */}
          <Button type="submit" className="w-[300px] place-self-center mt-2">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
