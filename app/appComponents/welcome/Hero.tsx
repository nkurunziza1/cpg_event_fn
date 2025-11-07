"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import InMotion from "@/utils/inMotion";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/app/lib/smoothScroll";

interface CarouselImage {
  image: string;
  title: string;
}

const Hero = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const carouselImage: CarouselImage[] = [
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1737412769/africanChildren_jhwnan.jpg",
      title: "community children",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1737412747/group-3137670_mxidfa.jpg",
      title: "children",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1739205283/WhatsApp_Image_2025-02-10_at_11.29.48_fa29s0.jpg",
      title: "Leadership Training For Marginalized Groups",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1737412705/technology_tctxfr.jpg",
      title: "technology access",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1737412742/nature_d6chtp.jpg",
      title: "nature",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImage.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImage.length]);


  return (
    <div className=" font-serif min-h-screen text-white" id="home">
      {/* Background Carousel with Multiple Overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {carouselImage.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40" />{" "}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />{" "}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />{" "}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative  container mx-auto px-6 pt-10  lg:flex-row flex-col flex justify-between items-center">
        <div className="max-w-6xl flex flex-col gap-12 py-32 lg:max-w-4xl">
          <InMotion>
            <h1 className="text-3xl leading-10 lg:text-6xl font-bold mb-4">
              Empowering Communities, Creating Sustainable{" "}
              <span className="text-">Futures</span>.
            </h1>
          </InMotion>
          <InMotion delay={0.3}>
            <p className="text-gray-200  font-circular leading-[20px] text-md lg:text-md mb-8">
              A world free from poverty and discrimination, where everyone
              enjoys dignity, equity, and access to technology, food security,
              and a healthy environment.
            </p>
          </InMotion>
          <InMotion delay={0.5}>
            <div className="flex md:flex-row flex-col gap-4">
              <button
                onClick={() => scrollToSection("mission")}
                className="px-4 justify-center md:justify-start py-3 xs:px-8 xs:py-3 rounded-[4px] bg-primary text-white flex items-center space-x-2 hover:bg-gray-700 transition-all"
              >
                <span>Learn About Our Mission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 justify-center md:justify-start py-3 xs:px-8 xs:py-3 rounded-[4px] bg-white flex items-center space-x-2 hover:bg-primary transition-colors text-black"
              >
                <span>Join Our Efforts</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </InMotion>
        </div>
      </div>
    </div>
  );
};

export default Hero;
