import { Icon } from '@iconify/react';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from 'next/link';

export function AvatarDropdown() {
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
                        <Link href='/invoices'>History</Link>
                    </DropdownMenuItem>
                </div>
                <hr style={{ margin: '10px 0' }} />
                <div className='flex items-center gap-2'>
                    <Icon icon="line-md:logout" className=" text-black w-6 h-6" />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
