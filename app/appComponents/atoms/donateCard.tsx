import React from "react";
import { ChevronRight } from "lucide-react";

interface CardProps {
  image: string;
  category: string;
  title: string;
  description: string;
}

const DonateCard: React.FC<CardProps> = ({
  image,
  category,
  title,
  description,
}) => {
  const truncatedDescription = description.slice(0, 100) + "...";

  return (
    <div className="max-w-sm rounded overflow-hidden">
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="px-6 py-4 flex-col flex gap-3 bg-white">
        <p className="text-primary text-base mb-2">{category}</p>
        <p className="font-bold text-xl mb-2">{title}</p>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
        />
        <a
          href="/donate"
          className="text-white justify-center text-xl font-epilogue bg-primary py-2 px-2 rounded-xs  flex items-center "
        >
          <span>Donate</span>
        </a>
      </div>
    </div>
  );
};

export default DonateCard;
