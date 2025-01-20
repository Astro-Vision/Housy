"use client";
import { EditProfile } from "@/components/dialog/edit-profile";
import ProfileInfoRow from "@/components/profile/profile-info-row";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const fetchProfile = async (userId: number | null) => {
        if (!userId) return;

        try {
            const response = await fetch(`/api/profile/get/${userId}`, { method: "GET" });
            if (!response.ok) throw new Error("Failed to fetch profile data");

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const handleProfileUpdate = (updatedProfile: any) => {
        setProfile(updatedProfile);
    };

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

    useEffect(() => {
        if (userId) {
            fetchProfile(userId);
        }
    }, [userId]);

    return (
        <div className="p-4">
            <div className="flex items-center justify-center h-fit">
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <h1 className="text-xl font-semibold py-4 px-6">Personal Info</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="px-6 py-2">
                            <ProfileInfoRow icon="gg:profile" label="Full Name" value={profile?.fullname || "-"} />
                            <ProfileInfoRow icon="mdi:email" label="Email" value={profile?.user?.email || "-"} />
                            <ProfileInfoRow icon="mdi:password" label="Password" value="********" />
                            <ProfileInfoRow icon="ci:house-01" label="Status" value="Tenant" />
                            <ProfileInfoRow icon="bi:gender-ambiguous" label="Gender" value={profile?.gender || "-"} />
                            <ProfileInfoRow icon="ic:outline-phone" label="Phone" value={profile?.phone || "-"} />
                            <ProfileInfoRow icon="mdi:map-marker" label="Address" value={profile?.address || "-"} />
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 border-gray-200">
                            <div className="w-fit h-fit mb-4">
                                <img
                                    src={profile?.image || "https://i.pinimg.com/736x/7d/56/54/7d565474ecb190a2e3789c484ada40a9.jpg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                                />
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full text-sm">
                                        <Icon icon="uil:edit" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <EditProfile profile={profile} onProfileUpdate={handleProfileUpdate} />
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}