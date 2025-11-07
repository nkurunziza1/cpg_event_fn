"use client";

import React, { useState } from "react";
import { donationsApi } from "@/app/lib/api-client";
import { CreateDonationRequest } from "@/app/types/dtos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

interface DonateFormProps {
    projectId: string;
    onSuccess?: () => void;
    onClose?: () => void;
}

const DonateForm: React.FC<DonateFormProps> = ({ projectId, onSuccess, onClose }) => {
    const [formData, setFormData] = useState<CreateDonationRequest>({
        fullname: "",
        email: "",
        telephone: "",
        amount: 0,
        projectId: projectId,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullname) newErrors.fullname = "Full name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.telephone) newErrors.telephone = "Phone number is required";
        if (formData.amount <= 0) newErrors.amount = "Amount must be greater than 0";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await donationsApi.create(formData);
            toast.success("Donation successful!");
            if (onSuccess) onSuccess();
            if (onClose) onClose();
            setFormData({
                fullname: "",
                email: "",
                telephone: "",
                amount: 0,
                projectId: projectId,
            });
        } catch (err) {
            toast.error("Failed to make donation.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
                <Label htmlFor="telephone">Phone Number</Label>
                <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleChange}
                    disabled={loading}
                />
                {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
            </div>
            <div>
                <Label htmlFor="amount">Donation Amount</Label>
                <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount || ""}
                    onChange={handleChange}
                    disabled={loading}
                    min="1"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Donate Now"}
            </Button>
        </form>
    );
};

export default DonateForm;
