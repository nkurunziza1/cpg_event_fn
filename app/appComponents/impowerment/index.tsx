import InMotion from "@/utils/inMotion";
import React from "react";

type ImageType = {
  title: string;
  link: string;
};

const Impowerment = () => {
  const images: ImageType[] = [
    {
      title: "Empower women",
      link: "https://res.cloudinary.com/dexaxaqjx/image/upload/c_crop,w_500,h_500,ar_1:1,g_auto/v1741016469/WhatsApp_Image_2025-03-03_at_15.54.53_ggaltn.jpg",
    },
    {
      title: "Tuberculosis",
      link: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741098560/WhatsApp_Image_2025-03-04_at_16.27.11_dhazda.jpg",
    },
    {
      title: "Safe Water and Sustainable Sanitation",
      link: "https://res.cloudinary.com/dexaxaqjx/image/upload/v1741098828/WhatsApp_Image_2025-03-04_at_16.33.30_thsi39.jpg",
    },
  ];

  return (
    <div className="container w-full px-4 lg:px-0  justify-center mx-auto font-serif mt-20 flex flex-col lg:flex-row gap-4">
      {images.map((image, index) => (
        <InMotion delay={index + 0.1}>
          <div
            key={index}
            className="relative bg-cover bg-center  lg:w-[385px] h-72 flex items-center justify-center 
          transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: `url(${image.link})`,
            }}
          >
            <h3 className="text-primary text-xl font-bold text-center px-4">
              {image.title}
            </h3>
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center 
          transition-opacity duration-300 opacity-0 hover:opacity-100"
            ></div>
          </div>
        </InMotion>
      ))}
    </div>
  );
};

export default Impowerment;
