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

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

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
        }
    }, []);

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

    const handleLogout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUserId(null);
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
        }
    }, [Cookies.get('token')]);

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
                            <SignUp />
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
}
