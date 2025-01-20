"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

interface SignUpProps {
    onLogin: (token: string) => void;
}

export function SignUp({ onLogin }: SignUpProps) {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const data = await response.json();
            Cookies.set("token", data.token, { expires: 1 });
            onLogin(data.token);
            alert("Registration successful!");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogDescription>
                    Create an account to get started.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="fullname"
                            placeholder="Enter your name"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm col-span-4">{error}</p>}
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
