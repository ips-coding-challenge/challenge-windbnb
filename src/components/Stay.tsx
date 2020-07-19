import React from "react";
import StayProps from "../interfaces/StayProps";

const Stay = ({
  city,
  country,
  superHost,
  title,
  rating,
  maxGuests,
  type,
  beds,
  photo,
}: StayProps) => {
  return (
    <div className="stay-container flex-col mb-8 w-auto">
      <img
        className="rounded-large w-full object-cover h-64"
        src={photo}
        alt="stay"
      />
      <div className="flex justify-between items-center mt-5">
        {superHost && (
          <div className="rounded-md border text-xs font-bold border-gray-600 p-2">
            SUPERHOST
          </div>
        )}
        <div className="text-gray-600 text-sm">
          {type}
          {beds ? `.${beds} beds` : ""}
        </div>
        <div className="flex items-center">
          <i className="material-icons text-red-400">star</i>
          <span className="text-gray-800">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Stay;
