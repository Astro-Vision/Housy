import React from "react";
import { Icon } from "@iconify/react";

type ProfileInfoRowProps = {
    icon: string;
    label: string;
    value: string;
};

export default function ProfileInfoRow({ icon, label, value }: ProfileInfoRowProps) {
    return (
        <div className="flex items-center mb-4 gap-4">
            <Icon icon={icon} className="w-8 h-8 text-gray-600" />
            <div className="flex flex-col text-left">
                <h2 className="text-sm font-semibold">{value}</h2>
                <p className="text-xs text-gray-600">{label}</p>
            </div>
        </div>
    );
}