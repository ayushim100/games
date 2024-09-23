import React, { useEffect, useState } from "react";

interface GameItemProps {
  name: string;
  firstReleaseDate: Date;
  summary: string;
  rating: string;
}

const GameItem: React.FC<GameItemProps> = ({
  name,
  firstReleaseDate,
  summary,
  rating,
}) => {
  return (
    <div className="flex bg-[#0e1a2b] p-4 mb-4 rounded-lg">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-[#ffffff] mb-2 text-start">
          {name}
        </h2>
        <p className="text-[#c1d1e8] text-start">
          Release Date: {new Date(firstReleaseDate).toLocaleDateString()}
        </p>
        <p className="text-[#c1d1e8] mt-2 text-start">{summary}</p>
      </div>
      <div className="flex items-center justify-center ml-4">
        <div className="w-10 h-10 rounded-full bg-[#5692e8] flex items-center justify-center">
          <span className="text-[#ffffff] font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
