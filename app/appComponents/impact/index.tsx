"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Users, Trees, DollarSign } from "lucide-react";
import { AnimatedNumber } from "@/utils/animatedNumber";
import InMotion from "@/utils/inMotion";

const ImpactSection = () => {
  const impactStats = [
    {
      icon: Users,
      value: "3,000+",
      description: "Women empowered through leadership training",
    },
    {
      icon: Trees,
      value: "10,000",
      description: "Trees planted in reforestation projects",
    },
  ];

  return (
    <div className="bg-gray-50 font-serif py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <InMotion>
            <h2 className="text-3xl font-bold text-secondary">Our Impact</h2>    
            </InMotion>
          <InMotion delay={0.3}>
           <p className="mt-4 text-lg text-gray-600">
            Transforming communities through empowerment and sustainability
          </p> 
          </InMotion>
          
        </div>

        <div
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dexaxaqjx/image/upload/v1738051050/annie-spratt-2INKkSrEmc8-unsplash_vbj68l.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
          <div className="relative grid md:grid-cols-2 gap-8 mb-16 lg:p-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className=" p-10 lg:p-20 rounded-lg shadow-md hover:shadow-xl transition-shadow flex lg:items-center"
              >
                <stat.icon className="w-12 h-12 text-primary mr-4" />
                <div>
                  <h3 className="text-4xl font-extrabold text-primary animate-rise">
                    <AnimatedNumber value={stat.value} />
                  </h3>
                  <p className="text-white">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ImpactSection;
