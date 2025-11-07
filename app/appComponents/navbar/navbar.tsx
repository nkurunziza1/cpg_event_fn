"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/logos/cpgLogo.webp"
              alt="CPG Rwanda Events"
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-black hover:text-red-600 font-bold transition-colors"
            >
              Events
            </Link>
            <Link
              href="/news"
              className="text-black hover:text-red-600 font-bold transition-colors"
            >
              News
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-black animate-slide-down">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/events"
              className="block text-black hover:text-red-600 font-bold transition-colors"
              onClick={toggleMobileMenu}
            >
              Events
            </Link>
            <Link
              href="/news"
              className="block text-black hover:text-red-600 font-bold transition-colors"
              onClick={toggleMobileMenu}
            >
              News
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
