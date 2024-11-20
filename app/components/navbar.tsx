import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';

export default function Navbar() {
    return (
        <div className="flex items-center gap-4">
            <Icon icon="line-md:search" className="text-black w-6 h-6" />
            <Input type="search" placeholder="City" />
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
        </div>
    )
}
