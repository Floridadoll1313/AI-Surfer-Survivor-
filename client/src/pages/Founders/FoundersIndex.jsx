import React from "react";
import FounderCard from "./FounderCard";

const founders = [
  {
    name: "Sailor Ann",
    role: "The Gentle Heart",
    image: "/images/sailor.jpg",
    link: "/founders/sailor-ann"
  },
  {
    name: "Stormy Gray",
    role: "The Protector",
    image: "/images/stormy.jpg",
    link: "/founders/stormy-gray"
  },
  {
    name: "Sky Marlin",
    role: "The Little Captain",
    image: "/images/sky.jpg",
    link: "/founders/sky-marlin"
  }
];

const FoundersIndex = () => {
  return (
    <div className="founders-container">
      <h1 className="founders-title">Meet Our Founders</h1>
      <p className="founders-subtitle">
        The loyal hearts who walked every mile of this journey.
      </p>

      <div className="founders-grid">
        {founders.map((f, i) => (
          <FounderCard key={i} {...f} />
        ))}
      </div>
    </div>
  );
};

export default FoundersIndex;
