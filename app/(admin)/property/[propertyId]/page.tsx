"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../../components/ui/button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface Region {
  id: string;
  name: string;
}

export default function PropertyEditPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [propertyId, setPropertyId] = useState<number>(0);

  const [rentType, setRentType] = useState("");
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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
  const [selectedVillage, setSelectedVillage] = useState("");
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/property/get-by/${params.propertyId}`, {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch property data");
        }
        const data = await response.json();
        setProperty(data);
        setPropertyId(data.id);
        setBathroom(data?.bathroom || 1);
        setBedroom(data?.bedroom || 1);
        setRentType(data.typeOfRent || "DAY");
        setSelectedAmenities(data?.amenities || []);

        setSelectedProvinceName(data.province || "");
        setSelectedRegencyName(data.regency || "");
        setSelectedDistrictName(data.district || "");
        setSelectedVillageName(data.village || "");
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }

    fetchProperty();
  }, [params.propertyId]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setSelectedAmenities((prevAmenities) => {
      if (prevAmenities.includes(value)) {
        return prevAmenities.filter((amenity) => amenity !== value);
      } else {
        return [...prevAmenities, value];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: form.nameProperty.value,
      description: form.description.value,
      area: Number(form.area.value),
      province: selectedProvinceName,
      regency: selectedRegencyName,
      district: selectedDistrictName,
      village: selectedVillageName,
      address: form.address.value,
      price: Number(form.price.value),
      typeOfRent: rentType,
      bedroom: bedroom,
      bathroom: bathroom,
      amenities: Array.from(
        form.querySelectorAll<HTMLInputElement>('input[name="amenities"]:checked')
      ).map((checkbox) => checkbox.value),
    };
    setIsLoading(true);
    try {
      const response = await fetch(`/api/property/update/${params.propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Property edit successfully!");
        router.push("/");
      } else {
        toast.error(`Error: ${result.message}`);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (selectedProvinceName && provinces.length > 0) {
      const matchedProvince = provinces.find((province) => province.name === selectedProvinceName);
      if (matchedProvince) {
        setSelectedProvince(matchedProvince.id);
      }
    }
  }, [selectedProvinceName, provinces]);

  useEffect(() => {
    if (selectedRegencyName && regencies.length > 0) {
      const matchedRegency = regencies.find((regency) => regency.name === selectedRegencyName);
      if (matchedRegency) {
        setSelectedRegency(matchedRegency.id);
      }
    }
  }, [selectedRegencyName, regencies]);

  useEffect(() => {
    if (selectedDistrictName && districts.length > 0) {
      const matchedDistrict = districts.find((district) => district.name === selectedDistrictName);
      if (matchedDistrict) {
        setSelectedDistrict(matchedDistrict.id);
      }
    }
  }, [selectedDistrictName, districts]);

  useEffect(() => {
    if (selectedVillageName && villages.length > 0) {
      const matchedVillage = villages.find((village) => village.name === selectedVillageName);
      if (matchedVillage) {
        setSelectedVillage(matchedVillage.id);
      }
    }
  }, [selectedVillageName, villages]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-9">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Property</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Icon icon="line-md:close-to-menu-alt-transition" width="28" height="28" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link className="w-full text-center" href="/in-transaction">In Transaction</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-center" href="/out-transaction">Out Transaction</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-center" href="/property">Add Property</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-2 flex flex-col justify-center" >
          <div className="space-y-2">
            <Label htmlFor="name">Name Property</Label>
            <Input id="name" defaultValue={property?.name} name="nameProperty" placeholder="Enter property name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={property?.description} name="description" placeholder="Enter description" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input id="area" defaultValue={property?.area} type="number" name="area" placeholder="Enter area" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              value={selectedProvince}
              onValueChange={(value) => {
                setSelectedProvince(value);
                const selected = provinces.find(province => province.id === value);
                console.log("selected", selected);

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
              value={selectedVillage}
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
            <Textarea id="address" defaultValue={property?.address} name="address" placeholder="Enter address" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" defaultValue={property?.price} type="number" name="price" placeholder="Enter price" />
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
                <Checkbox
                  id="furnished"
                  name="amenities"
                  value="FURNISHED"
                  checked={selectedAmenities.includes("FURNISHED")}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petAllowed"
                  name="amenities"
                  value="PET_ALLOWED"
                  checked={selectedAmenities.includes("PET_ALLOWED")}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="petAllowed">Pet Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sharedAccommodation"
                  name="amenities"
                  value="SHARED_ACCOMODATION"
                  checked={selectedAmenities.includes("SHARED_ACCOMODATION")}
                  onChange={handleCheckboxChange}
                />
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
            {isLoading ? "Editing Property..." : "Edit Property"}
          </Button>
        </form>
      </div>
    </div>
  );
}
