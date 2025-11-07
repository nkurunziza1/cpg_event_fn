"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { newsletterApi } from "@/app/lib/api-client";

const NewsletterSubscriptionForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError("Email is required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            await newsletterApi.subscribe(email);
            toast.success("Successfully subscribed to our newsletter!");
            setEmail(""); // Clear the input field on success
        } catch (err) {
            toast.error("Failed to subscribe.");
            setError("Failed to subscribe. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-center text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-center text-gray-600 mb-6">Stay updated with our latest news, projects, and impact stories.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email-subscription" className="sr-only">Email</Label>
                    <Input
                        id="email-subscription"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe"}
                </Button>
            </form>
        </div>
    );
};

export default NewsletterSubscriptionForm;
