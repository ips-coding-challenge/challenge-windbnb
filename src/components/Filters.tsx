import React, { useState, useEffect, memo, useRef } from "react";
import BedSelector from "./BedSelector";
import { store } from "../store/store";
import StayProp from "../interfaces/StayProps";

const Filters = memo(
  ({ stays, filtersType, dispatch, adults, children, show }: any) => {
    console.log("Filters called ?");
    // const { state, dispatch } = useContext(store);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const filtersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let citiesList: Array<string> = [];

      citiesList = stays.map((stay: StayProp) => {
        return stay.city;
      });
      citiesList = citiesList.filter((c, i) => citiesList.indexOf(c) === i);
      setCities(citiesList);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
      let filteredCities: Array<string> = [];
      filteredCities = stays
        .filter((stay: StayProp) =>
          stay.city.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
        .map((stay: StayProp) => stay.city);

      const final = filteredCities.filter(
        (c, i) => filteredCities.indexOf(c) === i
      );
      setCities(final);
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
      dispatch({ type: "SET_SHOW_FILTERS", value: false });
      dispatch({ type: "FILTERS_RESULTS" });
    };

    useEffect(() => {
      if (filtersType === "location") {
        const input = document.getElementById("city");
        input?.focus();
      }
    }, [filtersType]);

    useEffect(() => {
      if (show) {
        const clickOutside = (e: MouseEvent) => {
          if (!filtersRef?.current?.contains(e.target as Node)) {
            dispatch({ type: "SET_SHOW_FILTERS", value: false });
          }
        };

        document.addEventListener("click", clickOutside);

        return () => {
          document.removeEventListener("click", clickOutside);
        };
      }
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 overflow-y-auto">
        {console.log("am I Here ")}
        {/* content */}
        <div ref={filtersRef} className="m-h-full bg-white font-muli">
          <div className="flex flex-col h-full container mx-auto px-2 py-4">
            {/* header */}
            <div className="flex justify-between md:hidden">
              <span className=" text-sm font-bold">Edit your search</span>
              <i
                onClick={closeFilters}
                className="material-icons text-gray-900"
              >
                close
              </i>
            </div>
            {/* input Container*/}
            <div className="flex flex-col md:flex-row rounded-large shadow-md mt-4">
              <div
                onClick={() =>
                  dispatch({ type: "FILTERS_TYPE", value: "location" })
                }
                className="flex flex-col py-3 px-6 cursor-pointer hover:bg-gray-200 border-b md:border-r border-gray-200 md:w-1/3"
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
                onClick={() =>
                  dispatch({ type: "FILTERS_TYPE", value: "guests" })
                }
                className="flex-col py-3 px-6 md:w-1/3 cursor-pointer hover:bg-gray-200 md:border-r border-gray-200"
              >
                <span className="block capitalize mb-2 text-sm text-gray-900">
                  Guests
                </span>
                <div className="text-gray-500 focus:outline-none">
                  {children + adults > 0 ? children + adults : "Add Guests"}
                </div>
              </div>

              <div
                onClick={search}
                className="hidden md:flex cursor-pointer md:w-1/3 items-center justify-center"
              >
                <div className="flex items-center bg-red-500 hover:bg-red-700 transition duration-200 px-5 py-4 w-32 rounded-large text-white">
                  <i className="material-icons mr-2">search</i>
                  <span>Search</span>
                </div>
              </div>
            </div>

            {/* Results / city  */}
            <div className="flex flex-auto">
              <div
                className={` md:flex ${
                  filtersType === "location" ? "" : " hidden md:invisible"
                } mt-6 md:flex-initial md:w-1/3`}
              >
                <ul className="w-full">
                  {cities.map((c, i) => (
                    <li
                      onClick={() => selectCity(c)}
                      className="flex items-center my-4 cursor-pointer hover:bg-gray-300 p-2 transition duration-200"
                      key={i}
                    >
                      <i className="material-icons mr-4 text-gray-700">room</i>
                      <span className="text-gray-700">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results guests */}
              {/* TODO only show if guests filter selected */}
              {filtersType && filtersType == "guests" && (
                <div className="md:flex md:flex-col mt-6 flex-auto md:flex-initial md:w-1/3">
                  <BedSelector
                    dispatch={dispatch}
                    title="Adults"
                    age="Age 13 or above"
                    category="adults"
                    count={adults}
                  />
                  <BedSelector
                    dispatch={dispatch}
                    title="Children"
                    age="Age 2 - 12"
                    category="children"
                    count={children}
                  />
                </div>
              )}
            </div>

            {/* Button */}
            <div
              onClick={search}
              className="flex mt-4 mb-6 mx-auto cursor-pointer md:hidden justify-center bg-red-500 hover:bg-red-700 transition duration-200 px-5 py-4 w-32 rounded-large text-white self-start"
            >
              <i className="material-icons">search</i>
              <span>Search</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Filters;
