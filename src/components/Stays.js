import React from "react";
import Stay from "./Stay";
import stays from "../assets/stays.json";

function Stays() {
  console.log(`Stays`, stays);
  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Stays in Finland</h2>
        <span className="text-gray-800 text-xl">12+ stays</span>
      </div>
      {/* <div className="flex-col md:flex md:flex-row md:flex-wrap justify-center items-center">
        {stays.length > 0 && stays.map((stay, i) => <Stay {...stay} key={i} />)}
      </div> */}
      <div className="grid sm:gap-4 grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 mt-6">
        {stays.length > 0 && stays.map((stay, i) => <Stay {...stay} key={i} />)}
      </div>
    </div>
  );
}

export default Stays;
