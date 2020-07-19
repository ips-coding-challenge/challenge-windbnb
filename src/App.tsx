import React, { useEffect, useContext, useCallback } from "react";
import "./assets/main.css";
import logo from "./assets/logo.svg";
import Stays from "./components/Stays";
import Filters from "./components/Filters";
import { store, FilterType } from "./store/store";

function App() {
  const { state, dispatch } = useContext(store);

  const openFilters = (type: string) => {
    dispatch({ type: "SET_SHOW_FILTERS", value: true });
    dispatch({
      type: "FILTERS_TYPE",
      value: type,
    });
  };

  // const overflow = useCallback(() => {

  // }, []);

  useEffect(() => {
    if (state.showFilters) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [state.showFilters]);

  return (
    <div className="app">
      <div className="container mx-auto px-4">
        <header className="flex-column md:flex md:justify-between mt-4">
          <img src={logo} alt="windbnb logo" />
          <div className="flex flex-wrap box-shadow rounded-large shadow mt-8 md:mt-0 md:w-auto">
            <div
              onClick={() => openFilters("location")}
              className={`flex-auto border-r border-gray-200 py-4 px-4 font-muli cursor-pointer hover:bg-gray-200 transition duration-200 ${
                !state.city ? "text-gray-400" : ""
              }`}
            >
              {state.city ? `${state.city}, Finland` : "Add Location"}
            </div>
            <div
              onClick={() => openFilters("guests")}
              className="flex-auto border-r border-gray-200 py-4 px-4 text-gray-400 font-muli cursor-pointer hover:bg-gray-200 transition duration-200"
            >
              {state.children + state.adults > 0
                ? state.children + state.adults
                : "Add Guest"}
            </div>
            <i className="mx-4 flex-initial self-center material-icons text-red-500 text-3xl">
              search
            </i>
          </div>
        </header>

        <Stays stays={state.filteredStays} />

        {/* Filters */}
        {state && state.showFilters && (
          <Filters
            stays={state.stays}
            filtersType={state.filtersType}
            guests={state.guests}
            dispatch={dispatch}
            adults={state.adults}
            children={state.children}
          />
        )}
      </div>
    </div>
  );
}

export default App;
