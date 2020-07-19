import React, { createContext, useReducer } from "react";
import StayProps from "../interfaces/StayProps";
import staysData from "../assets/stays.json";
import StayProp from "../interfaces/StayProps";

enum FilterType {
  LOCATION,
  BEDS,
}
interface InitialStateProps {
  showFilters: boolean;
  stays: Array<StayProps>;
  filteredStays: Array<StayProp>;
  filtersType?: string;
  city: string;
  children: number;
  adults: number;
  guests: number;
}

interface ActionProps {
  type: string;
  value: any;
  category?: string;
}

const initialState: InitialStateProps = {
  showFilters: false,
  stays: staysData.sort((a, b) => b.rating - a.rating),
  filteredStays: staysData,
  filtersType: "",
  city: "",
  children: 0,
  adults: 0,
  guests: 0,
};

const store = createContext<{
  state: InitialStateProps;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });
const { Provider } = store;

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    (state: InitialStateProps, action: ActionProps) => {
      switch (action.type) {
        case "SET_SHOW_FILTERS":
          return { ...state, showFilters: action.value };
        case "FILTERS_TYPE":
          return { ...state, filtersType: action.value };
        case "FILTERS_RESULTS":
          const filtered = state.stays.filter((stay) => {
            if (state.city === "") {
              return stay.maxGuests >= state.children + state.adults;
            }
            return (
              state.city.toLowerCase() === stay.city.toLowerCase() &&
              stay.maxGuests >= state.children + state.adults
            );
          });
          return { ...state, filteredStays: filtered };
        case "SET_LOCATION":
          return { ...state, city: action.value };
        case "INCREMENT_CHILDREN":
          return { ...state, children: state.children + 1 };
        case "DECREMENT_CHILDREN":
          if (state.children > 0) {
            return { ...state, children: state.children - 1 };
          }
          return { ...state };
        case "INCREMENT_ADULTS":
          return { ...state, adults: state.adults + 1 };
        case "DECREMENT_ADULTS":
          if (state.adults > 0) {
            return { ...state, adults: state.adults - 1 };
          }
          return { ...state };
        default:
          throw Error("That action doesn't exist");
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, FilterType };
