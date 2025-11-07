"use client";
import React, { useState } from "react";
import {
  LightbulbIcon,
  ScaleIcon,
  LeafIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UserIcon,
  NetworkIcon,
} from "lucide-react";
import InMotion from "@/utils/inMotion";

const OrganizationOverview = () => {
  const [activeSection, setActiveSection] = useState("mission");

  const [cardHover, setCardHover] = useState<number | null>(null);

  const sections = {
    mission: {
      title: "Our Mission",
      content: `We empower communities by promoting gender equality, human rights, and sustainable development, enhancing access to education, technology, food security, and nutrition, while fostering environmental stewardship and advocating for a society free from poverty and discrimination.`,
      strategies: [
        "Education & Technology: Bridging the digital divide and fostering learning opportunities.",
        "Food Security & Nutrition: Building resilience and healthy communities.",
        "Environmental Stewardship: Pioneering sustainability for future generations.",
        "Equity & Advocacy: Championing human rights and gender equality.",
      ],
    },
    vision: {
      title: "Our Vision",
      content: `We envision a world where all people thrive with dignity, enjoying equal access to technology, opportunities, food security, nutrition, and a healthy environment, free from poverty and discrimination. This statement underlines the organization's commitment to holistic development and equality.`,
    },
  };

  const values = {
    title: "Our Values",
    content: [
      {
        name: "Empowerment",
        description:
          "Training women and individuals with disabilities in digital skills and entrepreneurship to unlock opportunities.",
        icon: LightbulbIcon,
      },
      {
        name: "Equity and Inclusion",
        description:
          "Implementing inclusive project designs that prioritize marginalized communities.",
        icon: ScaleIcon,
      },
      {
        name: "Sustainability",
        description:
          "Partnering with farmers to adopt climate-resilient agriculture practices.",
        icon: LeafIcon,
      },
      {
        name: "Integrity",
        description:
          "Publishing transparent impact reports accessible to all stakeholders.",
        icon: ShieldCheckIcon,
      },
      {
        name: "Excellence",
        description:
          "Utilizing cutting-edge research to deliver innovative, high-quality programs.",
        icon: TrophyIcon,
      },
      {
        name: "Leadership",
        description:
          "Mentoring young women to take active roles in community governance.",
        icon: UserIcon,
      },
      {
        name: "Collaboration",
        description:
          "Building partnerships with governments, NGOs, and private sectors to amplify impact.",
        icon: NetworkIcon,
      },
    ],
  };

  return (
    <div className="bg-white py-10" id="mission">
      <InMotion>
        <div className="container lg:w-full  justify-center mx-auto font-serif mt-20 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-2/5 lg:pr-4">
            <div
              className="relative h-[70vh]   bg-cover bg-center flex items-center  justify-center"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dexaxaqjx/image/upload/v1741016338/WhatsApp_Image_2025-03-03_at_15.04.41_rplglw.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 gap-10 flex flex-col items-center justify-center text-white text-start p-6">
                <h1 className="text-4xl font-bold mb-4">
                  Become a Proud Volunteer Now
                </h1>
                <p className="text-md text-gray-200 font-light leading-7 font-sans mb-6 lg:max-w-2xl">
                  We are dedicated to transforming lives through sustainable
                  development, gender equality, and community empowerment.
                </p>
                <button className="bg-primary self-start  hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                  Donate Now
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 pl-4">
            <div className="flex mb-6 space-x-4  border-b border-black  ring-gray-400">
              {Object.keys(sections).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section
                      ? "text-primary underline"
                      : " text-gray-700"
                  }`}
                >
                  {/* @ts-ignore */}
                  {sections[section].title}
                </button>
              ))}
            </div>
            {activeSection === "mission" && (
              <div>
                <p className="text-gray-700 mb-4">{sections.mission.content}</p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Key Strategies:</h3>
                  {sections.mission.strategies.map((strategy, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      <p>{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className=" p-6 rounded-lg ">
              {activeSection === "vision" && (
                <div>
                
                   <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-gray-700">{sections.vision.content}</p>  
                 
                 
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container w-full mb-10   justify-center mx-auto font-serif mt-20 flex flex-col lg:flex-row gap-4">
          <div>
            <InMotion>
            <h2 className="text-4xl  font-serif font-bold mb-2 text-center  text-primary">
              Our Values
            </h2>
            <p className="text-center pb-10 font-serif text-md">
              Keep your values positive because your values become your destiny
            </p>  
            </InMotion>
            
            <div className="grid md:grid-cols-2 px-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {values.content.map((value, index) => {
                const Icon = value.icon;
                return (
                  <InMotion key={index} delay={index/10 + 0.9}>
                    <div
                      onMouseEnter={() => setCardHover(index)}
                      onMouseLeave={() => setCardHover(null)}
                      
                      className={`bg-gray-100 p-4 hover:bg-secondary duration-300 cursor-pointer transition-all rounded-lg flex items-center group`}
                    >
                      <Icon
                        className={`mr-4 ${
                          cardHover === index ? "text-white" : "text-primary"
                        }`}
                        size={40}
                      />
                      <div>
                        <h3
                          className={`font-semibold font-serif text-lg mb-2 ${
                            cardHover === index ? "text-white" : "text-black"
                          }`}
                        >
                          {value.name}
                        </h3>
                        <p
                          className={`${
                            cardHover === index ? "text-white" : "text-gray-700"
                          } duration-300 transition-all`}
                        >
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </InMotion>
                );
              })}
            </div>
          </div>
        </div>
      </InMotion>
    </div>
  );
};

export default OrganizationOverview;
