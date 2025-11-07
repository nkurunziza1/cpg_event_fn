"use client";

import { MessageSquare } from "lucide-react";

interface SmsButtonProps {
  phoneNumber: string;
  message?: string;
  size?: number;
}

export const SmsButton = ({
  phoneNumber,
  message = "Hello! I'm interested in learning more.",
  size = 24,
}: SmsButtonProps) => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `sms:${cleanNumber}?body=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-40 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-iconColor text-white shadow-lg transition-all hover:scale-110  focus:outline-none focus:ring-2  focus:ring-offset-2"
      aria-label="Contact via SMS"
    >
      <MessageSquare size={size} />
    </button>
  );
};
