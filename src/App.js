import React from "react";
import "./assets/main.css";
import logo from "./assets/logo.svg";
import Stays from "./components/Stays";
import Filters from "./components/Filters";

function App() {
  return (
    <div className="app">
      <div className="container mx-auto px-4">
        <header className="flex-column md:flex md:justify-between mt-4">
          <img src={logo} alt="windbnb logo" />
          <div className="flex flex-wrap box-shadow rounded-large shadow mt-8 md:mt-0 md:w-auto">
            <div className="flex-auto border-r border-gray-200 py-4 px-4 font-muli">
              Helsinki, Finland
            </div>
            <div className="flex-auto border-r border-gray-200 py-4 px-4 text-gray-400 font-muli">
              Add Guest
            </div>
            <i className="mx-4 flex-initial self-center material-icons text-red-500 text-3xl">
              search
            </i>
          </div>
        </header>

        <Stays />

        {/* Filters */}
        <Filters />
      </div>
    </div>
  );
}

export default App;
