import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import Logo from "@/icon/Icon.svg";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { SignUp } from "./dialog/sign-up";
import { SignIn } from "./dialog/sign-in";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarDropdown } from "./dropdown/avatar-dropdown";

export default function Navbar() {
    return (
        <div className="flex items-center gap-4 h-14 px-4">
            <img src="../image/Icon.png" alt="Logo" className="flex-2 w-32" />
            <div className="relative flex items-center flex-1">
                <Icon icon="line-md:search" className="absolute left-2 text-black w-6 h-6" />
                <Input
                    type="search"
                    placeholder="City"
                    className="pl-10"
                    style={{ border: 'none', backgroundColor: '#f0f0f0' }}
                />
            </div>
            <div className="grid justify-items-center gap-3 grid-cols-2">
                <AvatarDropdown />
                {/* <Dialog>
                    <DialogTrigger asChild>
                        <Button>Sign In</Button>
                    </DialogTrigger>
                    <SignIn />
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Sign Up</Button>
                    </DialogTrigger>
                    <SignUp />
                </Dialog> */}
            </div>
        </div>
    );
}
