import React, { useState, useEffect, useContext } from "react";
import stays from "../assets/stays.json";
import BedSelector from "./BedSelector";
import { store, FilterType } from "../store/store";

function Filters() {
  const { state, dispatch } = useContext(store);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [filters, setFilters] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    let filteredCities: Array<string> = [];
    filteredCities = state.stays
      .filter((stay) =>
        stay.city.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
      .map((stay) => stay.city);

    const final = filteredCities.filter(
      (c, i) => filteredCities.indexOf(c) === i
    );
    setCities(final);
    // console.log("filtered Cities", hum);
  };

  const closeFilters = () => {
    dispatch({ type: "SET_SHOW_FILTERS", value: false });
  };

  const selectCity = (city: string) => {
    setCity(city);
    dispatch({ type: "SET_LOCATION", value: city });
    dispatch({ type: "FILTERS_TYPE", value: "" });
  };

  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOCATION", value: city });
    dispatch({ type: "FILTERS_RESULTS" });
    dispatch({ type: "SET_SHOW_FILTERS", value: false });
  };

  useEffect(() => {
    if (state.filtersType === "location") {
      const input = document.getElementById("city");
      input?.focus();
    }
  }, [state.filtersType]);

  return (
    // wrapper
    <div className="fixed inset-0 bg-black bg-opacity-25 overflow-y-auto">
      {/* content */}
      <div className="m-h-full bg-white font-muli">
        <div className="flex flex-col h-full container mx-auto px-2 py-4">
          {/* header */}
          <div className="flex justify-between md:hidden">
            <span className=" text-sm font-bold">Edit your search</span>
            <i onClick={closeFilters} className="material-icons text-gray-900">
              close
            </i>
          </div>
          {/* input Container*/}
          <div className="flex flex-col md:flex-row rounded-large shadow-md mt-4">
            <div
              onClick={() =>
                dispatch({ type: "FILTERS_TYPE", value: "location" })
              }
              className="flex flex-col py-3 px-6 border-b md:border-r border-gray-200 md:w-1/3"
            >
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

            <div
              onClick={() => dispatch({ type: "FILTERS_TYPE", value: "beds" })}
              className="flex-col py-3 px-6 md:w-1/3 md:border-r border-gray-200"
            >
              <span className="block capitalize mb-2 text-sm text-gray-900">
                Guests
              </span>
              <div className="text-gray-500 focus:outline-none">
                {state.beds ? state.beds : "Add Guests"}
              </div>
            </div>

            <div
              onClick={search}
              className="hidden md:flex  md:w-1/3 items-center justify-center"
            >
              <div className="flex items-center bg-red-500 px-5 py-4 w-32 rounded-large text-white">
                <i className="material-icons mr-2">search</i>
                <span>Search</span>
              </div>
            </div>
          </div>

          {/* Results / city  */}
          <div className="flex flex-auto">
            <div
              className={` md:flex ${
                state.filtersType === "location" ? "" : " hidden md:invisible"
              } mt-6 md:flex-initial md:w-1/3`}
            >
              <ul>
                {cities.map((c, i) => (
                  <li
                    onClick={() => selectCity(c)}
                    className="flex items-center my-4"
                    key={i}
                  >
                    <i className="material-icons mr-4 text-gray-700">room</i>
                    <span className="text-gray-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results beds */}
            {/* TODO only show if beds filter selected */}
            {state.filtersType && state.filtersType == "beds" && (
              <div className="md:flex md:flex-col mt-6 flex-auto md:flex-initial md:w-1/3">
                <BedSelector title="Adults" age="Age 13 or above" />
                <BedSelector title="Children" age="Age 2 - 12" />
              </div>
            )}
          </div>

          {/* Button */}
          <div
            onClick={search}
            className="flex mt-4 mb-6 mx-auto md:hidden justify-center bg-red-500 px-5 py-4 w-32 rounded-large text-white self-start"
          >
            <i className="material-icons">search</i>
            <span>Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
