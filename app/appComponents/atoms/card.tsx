import React from "react";
import { ChevronRight } from "lucide-react";

export interface CardProps {
  id: string
  image: string;
  category: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, category, title, description, id }) => {
  const truncatedDescription = description.slice(0, 70) + "...";

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="px-6 py-4 flex-col flex gap-3 bg-white">
        <p className="text-primary text-base mb-2">{category}</p>
        <p className="font-bold text-md mb-2">{title}</p>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
        />
        <a href={`/recent-projects/${id}`} className="text-primary text-sm flex items-center ">
          Read More <ChevronRight className="text-sm mt-1" size={16} />
        </a>
      </div>
    </div>
  );
};

export default Card;
