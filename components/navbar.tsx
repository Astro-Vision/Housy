import { Icon } from '@iconify/react';
import { AvatarDropdown } from "./dropdown/avatar-dropdown";
import { Input } from "./ui/input";

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
