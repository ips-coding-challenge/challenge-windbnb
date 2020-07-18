import React, { useState, useEffect } from "react";
import stays from "../assets/stays.json";

function Filters() {
  const [city, setCity] = useState("Helsinki, Finland");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    let newCities: Array<string> = [];
    stays.map((stay) => {
      newCities.push(`${stay.city}, ${stay.country}`);
    });

    const filtered = newCities.filter((c, i) => newCities.indexOf(c) === i);
    setCities(filtered);
    console.log("New cities", filtered);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  return (
    <div className="fixed bottom-20 inset-0 bg-white font-muli">
      <div className="flex flex-col h-full container mx-auto px-2 py-4">
        {/* header */}
        <div className="flex justify-between">
          <span className=" text-sm font-bold">Edit your search</span>
          <i className="material-icons text-gray-900">close</i>
        </div>
        {/* input Container*/}
        <div className="flex flex-col rounded-large shadow-md mt-4">
          <div className="flex flex-col py-3 px-6 border-b border-gray-200">
            <label
              htmlFor="city"
              className="block capitalize mb-2 text-sm text-gray-900"
            >
              Location
            </label>
            <input
              className="text-gray-900 focus:outline-none"
              id="city"
              type="text"
              value={city}
              onChange={handleChange}
            />
          </div>

          <div className="flex-col py-3 px-6">
            <span className="block capitalize mb-2 text-sm text-gray-900">
              Guests
            </span>
            <div className="text-gray-500 focus:outline-none">Add Guests</div>
          </div>
        </div>

        {/* Results /  */}
        <div className="mt-6 flex-auto">
          <ul>
            {cities.map((c, i) => (
              <li className="flex items-center my-4" key={i}>
                <i className="material-icons mr-4 text-gray-700">room</i>
                <span className="text-gray-700">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="flex mb-6 mx-auto justify-center bg-red-500 px-5 py-4 w-32 rounded-large text-white self-start">
          <i className="material-icons">search</i>
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

export default Filters;
