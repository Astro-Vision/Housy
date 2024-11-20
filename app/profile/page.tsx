import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

// Nested Component
type ProfileInfoRowProps = {
    icon: string;
    label: string;
    value: string;
};

const ProfileInfoRow: React.FC<ProfileInfoRowProps> = ({ icon, label, value }) => {
    return (
        <div className="flex items-center mb-4 gap-4">
            <Icon icon={icon} className="w-8 h-8 text-gray-600" />
            <div className="flex flex-col text-left">
                <h2 className="text-sm font-semibold">{value}</h2>
                <p className="text-xs text-gray-600">{label}</p>
            </div>
        </div>
    );
};

// Parent Component
const Profile: React.FC = () => {
    return (
        <div className="bg-gray-100 p-4">
            <div className="flex items-center justify-center h-fit">
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <h1 className="text-xl font-semibold  py-4 px-6">Personal Info</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Column */}
                        <div className="px-6 py-2">
                            <ProfileInfoRow icon="gg:profile" label="Full Name" value="John Doe" />
                            <ProfileInfoRow icon="mdi:email" label="Email" value="john.doe@example.com" />
                            <ProfileInfoRow icon="mdi:password" label="Password" value="********" />
                            <ProfileInfoRow icon="ci:house-01" label="Status" value="Tenant" />
                            <ProfileInfoRow icon="bi:gender-ambiguous" label="Gender" value="Male" />
                            <ProfileInfoRow icon="ic:outline-phone" label="Phone" value="+62 812-8623-8911" />
                            <ProfileInfoRow
                                icon="mdi:map-marker"
                                label="Address"
                                value="Perumahan Permata Bintaro Residence C-3"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col items-center justify-center p-6 border-gray-200">
                            <div className="w-fit h-fit mb-4">
                                <img
                                    src="https://i.pinimg.com/736x/7d/56/54/7d565474ecb190a2e3789c484ada40a9.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                                />
                            </div>
                            <Button className="w-full text-sm">
                                <Icon icon="uil:edit" />
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
