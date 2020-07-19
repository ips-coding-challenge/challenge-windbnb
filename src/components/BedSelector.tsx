import React, { useState, memo } from "react";
import { store } from "../store/store";

interface BedProps {
  title: string;
  age: string;
  count: number;
  category: string;
  dispatch: React.Dispatch<any>;
}

const BedSelector = memo(
  ({ title, age, dispatch, count, category }: BedProps) => {
    // const { state, dispatch } = useContext(store);
    // const [count, setCount] = useState<number>(0);

    const increment = () => {
      switch (category) {
        case "children":
          dispatch({ type: "INCREMENT_CHILDREN" });
          break;
        case "adults":
          dispatch({ type: "INCREMENT_ADULTS" });
          break;
        default:
          throw new Error("Wrong Category");
      }

      // setCount((count) => count + 1);
    };

    const decrement = () => {
      switch (category) {
        case "children":
          dispatch({ type: "DECREMENT_CHILDREN" });
          break;
        case "adults":
          dispatch({ type: "DECREMENT_ADULTS" });
          break;
        default:
          throw new Error("Wrong Category");
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
);

export default BedSelector;
