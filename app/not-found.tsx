import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "./appComponents/navbar/navbar";
import "./globals.css";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Navbar */}
      <div className="z-50 relative">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="flex-1">
        <div
          className="min-h-[calc(100vh-200px)] bg-cover bg-center bg-fixed bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url(/assets/noiseImages/home_bg.jpg)" }}
        >
          <div className="min-h-full w-full bg-gradient-to-br from-black/60 via-black/50 to-black/60 flex items-center justify-center py-12 px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
              {/* 404 Number */}
              <div className="mb-6">
                <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-4">
                  404
                </h1>
                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
              </div>

              {/* Title and Message */}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have
                been moved or deleted.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg"
                >
                  <Home className="w-5 h-5" />
                  Go to Homepage
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg transition-all hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </Link>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">You might be looking for:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/"
                    className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline"
                  >
                    Events
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    href="/news"
                    className="text-sm text-red-600 hover:text-red-700 font-semibold hover:underline"
                  >
                    News
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 CPG Rwanda Events. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
