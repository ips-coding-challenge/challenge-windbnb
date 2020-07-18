import React, { useState, useContext } from "react";
import { store } from "../store/store";

interface BedProps {
  title: string;
  age: string;
}

function BedSelector({ title, age }: BedProps) {
  const { state, dispatch } = useContext(store);
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    dispatch({ type: "INCREMENT_BEDS" });
    setCount((count) => count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      dispatch({ type: "DECREMENT_BEDS" });
      setCount((count) => count - 1);
    }
  };

  return (
    <div className="flex flex-col items-center md:items-start mb-6">
      <div className="font-muli font-bold text-xl text-left">{title}</div>
      <div className="text-gray-600 text-gray-700 text-left mb-4">{age}</div>

      {/* Incrementer */}
      <div className="flex items-center md:justify-start">
        <button
          onClick={decrement}
          className="text-xl rounded-xs outline-none px-2 border border-gray-500"
        >
          -
        </button>
        <div className="mx-4">{count}</div>
        <button
          onClick={increment}
          className="text-xl rounded-xs outline-none px-2 border border-gray-500"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default BedSelector;
