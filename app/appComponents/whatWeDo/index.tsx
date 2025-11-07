import InMotion from "@/utils/inMotion";
import React from "react";

const WhatWeDo = () => {
  const sections = [
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741097335/WhatsApp_Image_2025-03-04_at_15.26.34_ze2nps.jpg",
      title: "Technology & Education Access",
      description:
        "Programs: Offering digital literacy workshops and scholarships for marginalized students.",
      impact:
        "Over 2,000 youth trained in ICT, enabling them to secure meaningful employment.",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1739205349/WhatsApp_Image_2025-02-10_at_12.56.11_ppgjks.jpg",
      title: "Food Security & Nutrition",
      description:
        "Initiatives: Supporting sustainable farming techniques and providing nutritional education to families.",
      impact:
        "Featured story: A family transitioning from subsistence farming to running a profitable agribusiness.",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741097321/WhatsApp_Image_2025-03-04_at_15.26.32_xbhxzw.jpg",
      title: "Environmental Stewardship",
      description:
        "Projects: Tree-planting campaigns and promoting renewable energy in rural communities.",
      impact:
        "Reduced deforestation by 30% in target areas through awareness and intervention programs.",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741099218/WhatsApp_Image_2025-03-03_at_16.03.54_y1gzii.jpg",
      title: "Human Rights & Gender Equality",
      description:
        "Campaigns: Educating communities on human rights and addressing systemic gender inequities.",
      impact:
        "Increased women's participation in decision-making roles by 15% in project areas.",
    },
    {
      image:
        "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741099007/WhatsApp_Image_2025-03-04_at_15.26.29_yewgcq.jpg",
      title: "Community Empowerment",
      description:
        "Focus: Capacity-building workshops and Voluntary Savings and Loans (VSL) initiatives.",
      impact:
        "A women-led cooperative thriving through income-generating activities.",
    },
  ];

  return (
    <div className=" text-white" id="expertise">
      <div className="container font-serif mx-auto px-4 py-16">
        <InMotion>
          <h2 className="text-4xl font-bold text-center mb-16 text-secondary">
          What We Do
        </h2> 
        </InMotion>
       
        <div className=" gap-6 grid grid-cols-1 md:grid-cols-2">
          {sections.map((section, index) => (
            <InMotion key={index} delay={index/10 + 0.2}>
             <div key={index} className="">
              <div className="w-full">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[400px]  object-cover "
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl text-secondary font-semibold mb-4">
                  {section.title}
                </h3>
                <p className="text-black mb-4">{section.description}</p>
                <div className="bg-neutral-800 p-4 rounded-lg">
                  <p className="text-neutral-200 italic">"{section.impact}"</p>
                </div>
              </div>
            </div> 
            </InMotion>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
