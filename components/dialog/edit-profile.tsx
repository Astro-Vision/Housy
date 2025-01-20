"use client";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { SingleImageDropzone } from "../input-image/single-image";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface EditProfileProps {
    profile: any;
    onProfileUpdate: (updatedProfile: any) => void;
}

export function EditProfile({ profile, onProfileUpdate }: EditProfileProps) {
    const [file, setFile] = useState<File>();
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Token decoding error:", error);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const form = e.currentTarget;

        formData.append("fullname", form.fullname.value ? form.fullname.value : profile?.fullname);
        formData.append("gender", form.gender.value ? form.gender.value : profile?.gender);
        formData.append("phone", form.phone.value ? form.phone.value : profile?.phone);
        formData.append("address", form.address.value ? form.address.value : profile?.address);

        if (file) {
            formData.append("image", file ? file : profile?.image);
        }

        try {
            const response = await fetch(`/api/profile/update/${userId}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
            const updatedProfile = await response.json();
            onProfileUpdate(updatedProfile);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Edit your profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-2 flex flex-col justify-center">
                <div className="flex space-y-2 justify-between">
                    <div className="w-1/2">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Fullname</Label>
                            <Input defaultValue={profile?.fullname} id="fullname" type="text" name="fullname" placeholder="Enter yout fullname" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="Gender">Gender</Label>
                            <Select defaultValue={profile?.gender} name="gender">
                                <SelectTrigger id="Gender">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input defaultValue={profile?.phone} id="phone" type="number" name="phone" placeholder="Enter yout phone number" />
                        </div>
                    </div>
                    <>
                        <SingleImageDropzone
                            width={200}
                            height={207}
                            value={file}
                            onChange={(file) => {
                                setFile(file);
                            }}
                        />
                    </>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input defaultValue={profile?.address} id="address" type="text" name="address" placeholder="Enter yout address" />
                </div>

                <DialogFooter>
                    <Button type="submit">
                        Edit
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}