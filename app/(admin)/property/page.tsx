
"use client";
import { FileState, MultiImageDropzone } from "@/components/input-image/multiple-image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface Region {
  id: string;
  name: string;
}

export default function PropertyPage() { 
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [rentType, setRentType] = useState("");
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);

  const [provinces, setProvinces] = useState<Region[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");

  const [regencies, setRegencies] = useState<Region[]>([]);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedRegencyName, setSelectedRegencyName] = useState("");

  const [districts, setDistricts] = useState<Region[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  const [villages, setVillages] = useState<Region[]>([]);
  const [selectedVillageName, setSelectedVillageName] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchRegencies = async () => {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
          );
          const data = await response.json();
          setRegencies(data);
        } catch (error) {
          console.error("Failed to fetch regencies:", error);
        }
      };

      fetchRegencies();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
          );
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error("Failed to fetch districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchVillages = async () => {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`
          );
          const data = await response.json();
          setVillages(data);
        } catch (error) {
          console.error("Failed to fetch villages:", error);
        }
      };

      fetchVillages();
    }
  }, [selectedDistrict]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const form = e.currentTarget;

    formData.append("name", form.nameProperty.value);
    formData.append("description", form.description.value);
    formData.append("area", form.area.value);
    formData.append("province", selectedProvinceName);
    formData.append("regency", selectedRegencyName);
    formData.append("district", selectedDistrictName);
    formData.append("village", selectedVillageName);
    formData.append("address", form.address.value);
    formData.append("price", form.price.value);
    formData.append("typeOfRent", rentType);
    formData.append("bedroom", bedroom.toString());
    formData.append("bathroom", bathroom.toString());

    form.querySelectorAll<HTMLInputElement>('input[name="amenities"]:checked').forEach((checkbox) => {
      formData.append("amenities", checkbox.value);
    });

    fileStates.forEach((fileState) => {
      if (fileState.file) {
        formData.append("image", fileState.file);
      }
    });

    try {
      const response = await fetch("/api/property/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        alert("Property created successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Property</h1>
      </div>
      <div className="max-w-4xl mx-auto p-4">

        <form onSubmit={handleSubmit} className="space-y-2 flex flex-col justify-center" >
          <div className="space-y-2">
            <Label htmlFor="name">Name Property</Label>
            <Input id="name" name="nameProperty" placeholder="Enter property name" />
          </div>

          <div>
            <MultiImageDropzone
              value={fileStates}
              dropzoneOptions={{
                maxFiles: 6,
              }}
              onChange={(files) => {
                setFileStates(files);
              }} />

          </div>

          <div className="space-y-2">

            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Enter description" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input id="area" type="number" name="area" placeholder="Enter area" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              value={selectedProvince}
              onValueChange={(value) => {
                setSelectedProvince(value);
                const selected = provinces.find(province => province.id === value);
                if (selected) {
                  setSelectedProvinceName(selected.name);
                }
              }}>
              <SelectTrigger id="province">
                <SelectValue placeholder="Select a Province" />

              </SelectTrigger>
              <SelectContent className="h-64">
                {provinces.map((province: any) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regency">Regency</Label>
            <Select
              value={selectedRegency}
              onValueChange={(value) => {
                setSelectedRegency(value);
                const selected = regencies.find(regencies => regencies.id === value);
                if (selected) {
                  setSelectedRegencyName(selected.name);
                }
              }}>
              <SelectTrigger id="regency">
                <SelectValue placeholder="Select a Regency" />
              </SelectTrigger>
              <SelectContent className="h-64">
                {regencies.map((regency: any) => (
                  <SelectItem key={regency.id} value={regency.id}>
                    {regency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Select
              value={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value);
                const selected = districts.find(districts => districts.id === value);
                if (selected) {
                  setSelectedDistrictName(selected.name);
                }
              }}>
              <SelectTrigger id="district">
                <SelectValue placeholder="Select a District" />
              </SelectTrigger>
              <SelectContent className="h-64">
                {districts.map((district: any) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="village">Village</Label>
            <Select
              onValueChange={(value) => {
                const selected = villages.find(village => village.id === value);
                if (selected) {
                  setSelectedVillageName(selected.name);
                }
              }}>
              <SelectTrigger id="village">
                <SelectValue placeholder="Select a Village" />
              </SelectTrigger>
              <SelectContent className="h-64">
                {villages.map((village: any) => (
                  <SelectItem key={village.id} value={village.id}>
                    {village.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Textarea id="address" name="address" placeholder="Enter address" />

          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input id="price" type="number" name="price" placeholder="Enter price" />

          </div>

          <div className="space-y-2">

            <Label htmlFor="rentType">Type of Rent</Label>
            <Select
              value={rentType}
              onValueChange={(e) => setRentType(e)}>
              <SelectTrigger id="rentType">

                <SelectValue placeholder="Select rent type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAY">Day</SelectItem>
                <SelectItem value="MONTH">Month</SelectItem>
                <SelectItem value="YEAR">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="flex space-x-4 ps-2">
              <div className="flex items-center space-x-2">

                <Checkbox id="furnished" name="amenities" value="FURNISHED" />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="petAllowed" name="amenities" value="PET_ALLOWED" />
                <Label htmlFor="petAllowed">Pet Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sharedAccommodation" name="amenities" value="SHARED_ACCOMODATION" />
                <Label htmlFor="sharedAccommodation">Shared Accommodation</Label>

              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedroom">Bedroom</Label>

            <Select
              value={bedroom.toString()}
              onValueChange={(e) => setBedroom(parseInt(e))}>

              <SelectTrigger id="bedroom">
                <SelectValue placeholder="Select number of bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathroom">Bathroom</Label>

            <Select
              value={bathroom.toString()}
              onValueChange={(e) => setBathroom(parseInt(e))}>

              <SelectTrigger id="bathroom">
                <SelectValue placeholder="Select number of bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <Button type="submit" className="w-full place-self-center mt-2">
            Add Property

          </Button>
        </form>
      </div>
    </div>
  );
}
