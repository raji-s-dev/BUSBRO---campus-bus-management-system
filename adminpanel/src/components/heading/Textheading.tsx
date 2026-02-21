import React from "react";

interface HeadingProps {
  title: string;
  logo?: string; // optional, in case sometimes you don’t need a logo
  className?: string; // optional extra styles
}

const Heading: React.FC<HeadingProps> = ({ title, logo, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 pl-6 pr-2 ${className}`}>
      <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
        {title}
      </h2>
      {logo && (
        <img
          src={logo}
          alt={`${title} icon`}
          className="w-4 h-4 object-contain"
        />
      )}
    </div>
  );
};

export default Heading;
