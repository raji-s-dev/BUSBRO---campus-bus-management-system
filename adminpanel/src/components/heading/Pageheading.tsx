
import React from "react";
import { useNavigate } from "react-router-dom";
import arrowleft from '../../assets/emergency/backarrow.png';

// Props type
interface HeadingProps {
  title: string;
}

const PageHeading: React.FC<HeadingProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl py-4 w-full font-inter shadow-md flex items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // go back to previous page
        className="ml-4 p-1 hover:bg-gray-100 rounded-full"
      >
        <img src={arrowleft} alt="arrowleft" className="w-6 h-6 text-gray-600" />
      </button>

      {/* Title */}
      <h1 className="flex-1 text-center text-gray-600 font-semibold text-base sm:text-lg">
        {title}
      </h1>

      {/* Spacer */}
      <div className="w-10" />
    </div>
  );
};

export default PageHeading;
