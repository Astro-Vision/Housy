"use client";
import { Icon } from '@iconify/react';
import { AvatarDropdown } from "./dropdown/avatar-dropdown";
import { Input } from "./ui/input";
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { SignIn } from './dialog/sign-in';
import { SignUp } from './dialog/sign-up';
import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import { useSearchContext } from './search';
import Image from 'next/image';

export default function Navbar() {
    const { searchQuery, setSearchQuery } = useSearchContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [_, setUserId] = useState<number | null>(null);

    const handleLogin = (token: string) => {
        Cookies.set('token', token);
        setIsAuthenticated(true);

        try {
            const decoded: any = jwtDecode(token);
            setUserId(decoded.id);
        } catch (error) {
            console.error('Token decoding error:', error);
        }
    };

    const handleLogout = async () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUserId(null);
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                await response.json();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        } else {
            setIsAuthenticated(false);
            setUserId(null);
        }
    }, []);

    return (
        <div className="flex items-center gap-4 h-14 px-4">
            <Link href={'/'}>
                <Image src="/Icon.png" alt="Logo" width={100} height={100} />
            </Link>
            <div className="relative flex items-center flex-1">
                <Icon icon="line-md:search" className="absolute left-2 text-black w-6 h-6" />
                <Input
                    type="search"
                    placeholder="City"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', backgroundColor: '#f0f0f0' }}
                />
            </div>
            <div className="grid justify-items-center gap-3 grid-cols-2">
                {isAuthenticated ? (
                    <>
                        <AvatarDropdown onLogout={handleLogout} />
                    </>
                ) : (
                    <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Sign In</Button>
                            </DialogTrigger>
                            <SignIn onLogin={handleLogin} />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Sign Up</Button>
                            </DialogTrigger>
                            <SignUp onLogin={handleLogin} />
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
}
