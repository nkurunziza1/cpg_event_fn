"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  size?: number;
}

export const WhatsAppButton = ({
  phoneNumber,
  message = "Hello! I'm interested in learning more.",
  size = 24,
}: WhatsAppButtonProps) => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={size} />
    </button>
  );
};
