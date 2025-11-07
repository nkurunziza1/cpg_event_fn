"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        // Clear local storage
        localStorage.clear();

        // Redirect to login page
        router.push("/login");
    };

    return (
        <Button onClick={handleLogout} className="w-full text-left justify-start">
            Logout
        </Button>
    );
};

export default LogoutButton;
