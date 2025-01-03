import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React from "react";

type PropertyFeaturesProps = {
    label: string;
    value: string;
    icon?: string;
};

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ label, value, icon }) => {
    return (
        <div className="property-feature">
            <p className="text-gray-600 text-sm">{label}</p>
            <div className="flex gap-2 items-center justify-start">
                <h3>{value}</h3>
                {icon && <Icon icon={icon} />}
            </div>
        </div>
    );
};

function DetailProperty() {
    return (
        <div className="bg-gray-100">
            <div className="max-w-screen-lg mx-auto p-8">
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50 h-full" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                            <div className="aspect-video rounded-xl bg-gray-400 bg-opacity-50" />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-4xl my-6">House Astina</h2>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold text-xl">
                                    Rp.9.000.000
                                    <span>/ Year</span>
                                </h3>
                                <p className="text-gray-600 text-sm w-[80%]">
                                    Jl. Elang IV Perum Permata Bintaro Residence, Pondok Aren, Tangerang Selatan
                                </p>
                            </div>

                            <div className="flex gap-6 items-start">
                                <PropertyFeatures label="Bedrooms" value="3" icon="fluent-emoji-high-contrast:bed" />
                                <PropertyFeatures label="Bathrooms" value="3" icon="mdi:bathroom" />
                                <PropertyFeatures label="Area" value="1800 ft" />
                            </div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-xl mt-6 mb-2">Description</h2>
                            <p className="text-gray-600 text-sm">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button className="w-[20%] text-right">
                                Book Now
                            </Button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProperty;
