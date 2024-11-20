import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import Logo from "@/icon/Icon.svg";
import { Input } from "./ui/input";

export default function Navbar() {
    return (
        <div className="flex items-center gap-4 h-14">
            <img src={Logo} alt="Logo" className="flex-2 w-32"/>
            <div className="relative flex items-center flex-1">
                <Icon icon="line-md:search" className="absolute left-2 text-black w-6 h-6" />
                <Input
                    type="search"
                    placeholder="City"
                    className="pl-10"
                    style={{ border: 'none', backgroundColor: '#f0f0f0' }}
                />
            </div>
            <div className="grid gap-4 grid-cols-2">
                <Button>Sign In</Button>
                <Button>Sign Up</Button>
            </div>
        </div>
    );
}
