"use client";
import { Icon } from '@iconify/react';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AvatarDropdownProps {
    onLogout: () => void;
}

export function AvatarDropdown({onLogout}: AvatarDropdownProps) {
    const router = useRouter();
    const handleLogout = () => {
        onLogout();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" className="rounded-full w-9 h-9" />
                    <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 p-2 mr-2 gap-2 bg-white shadow-lg rounded-lg">
                <div className='flex items-center gap-2'>
                    <Icon icon="line-md:account-small" className=" text-black w-6 h-6" />
                    <DropdownMenuItem>
                        <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                </div>
                <div className='flex items-center gap-2'>
                    <Icon icon="line-md:calendar" className=" text-black w-6 h-6" />
                    <DropdownMenuItem>
                        <Link href='/booking'>My Booking</Link>
                    </DropdownMenuItem>
                </div>
                <div className='flex items-center gap-2'>
                    <Icon icon="line-md:clipboard-list" className=" text-black w-6 h-6" />
                    <DropdownMenuItem>
                        <Link href='/history'>History</Link>
                    </DropdownMenuItem>
                </div>
                <hr style={{ margin: '10px 0' }} />
                <div className='flex items-center gap-2'>
                    <Icon icon="line-md:logout" className=" text-black w-6 h-6" />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
