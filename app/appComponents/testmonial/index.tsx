"use client";
import React from "react";
import { Users } from "lucide-react";
import { AnimatedTestimonials } from "./card";
import { GradientButton } from "../atoms/button";
import { scrollToSection } from "@/app/lib/smoothScroll";

const Testimonials = () => {
  const testimonies = [
    {
      name: "Oddetah AYISHAKIYE",
      designation: "Maraba sector, Huye district. We are 7 in my family",
      src: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1739526201/tetstmonial1_j9rqu9.jpg",
      quote:
        "Before benefiting the project of AFOR financed by RGB in joint program with ONE UN-UNDP, my family was very poor facing many problems such as family conflicts, no family planning, low economic income and low spirit in creating the small income generating activities.",
    },
    {
      name: "Family",
      designation: "Huye District",
      src: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1738683911/testmonial_u97lka.webp",
      quote:
        "When I was involved in the project through the training by AFOR in entrepreneurship skills and family planning and counseling on family conflicts me and my husband we were changed positively on our minds to grow economically to develop our family. \n Before we had no domestic animal, but now AFOR gave us A pig to our family. Me and my husband now live happily than Ever. My husband never used to consult me on family matters But now we decide together on decisions made in our family.",
    },
    {
      name: "Family",
      designation: "Huye District",
      src: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1739526201/testmonial2_rbnyqb.jpg",
      quote:
        "A pig to our family. ME and my husband now live happily than Ever. My husband never used to consult me on family matters But now we decide together on decisions made in our family. \n We are now aware of family planning importance. We thank AFOR and pray that they continue to help other families all over the country ",
    },
    {
      name: "KABERA JEAN DE ",
      designation: "Reduced school dropout in Maraba Sector",
      src: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1739526201/testmonial3_d7hzle.jpg",
      quote:
        "During the project implementation of AFOR  financed by RGB in joint program with ONE UN-UNDP, the school drop out for the year 2018-2019 has reduced too much in Maraba sector.AFOR have taken 189 children who have been living in the streets back to schools. This was the highest number of school dropout who successfully with the help of AFOR went back to school.AFOR provided them with school materials.\n AFOR also formed clubs in schools on child rights and child protection. They also provided booklets to schools which will be included in syllabus to teach other students on there rights. AFOR has made parents in Maraba sector to encourage their children to go to study.",
    },
  ];

  const volunteerRoles = [
    "Mentors for youth leadership",
    "Environmental campaign trainers",
    "Community development specialists",
  ];

  const donationImpacts = [
    { amount: "$10", impact: "5 tree seedlings planted" },
    { amount: "$100", impact: "ICT training for 3 youth" },
  ];

  return (
    <div className="bg-secondary font-serif py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl flex items-center justify-center text-center font-bold text-primary mb-6">
            <span className="mr-2">“</span>
            Hear From Those We've Empowered
            <span className="ml-2">”</span>
          </h3>

          <AnimatedTestimonials testimonials={testimonies} />
        </div>

        {/* Get Involved */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Volunteer Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Volunteer Opportunities
            </h3>
            <ul className="space-y-2">
              {volunteerRoles.map((role, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <Users className="w-5 h-5 mr-2 text-green-500" />
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* Donation Impact */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Your Contribution Matters
            </h3>
            {donationImpacts.map((impact, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-200"
              >
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">
                    {impact.amount}
                  </span>
                </div>
                <span className="text-gray-600">{impact.impact}</span>
              </div>
            ))}
          </div>
          <div>
            <GradientButton
              onClick={() => scrollToSection("contact")}
              icon=""
              className="bg-primary cursor-pointer"
            >
              Joint campaigns.
            </GradientButton>
            <GradientButton
              onClick={() => scrollToSection("contact")}
              icon=""
              className="bg-transparent cursor-pointer hover:bg-primary text-white border border-primary"
            >
              Co-branded community programs.
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
