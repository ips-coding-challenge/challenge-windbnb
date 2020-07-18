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
  beds: number;
}

interface ActionProps {
  type: string;
  value: any;
}

const initialState: InitialStateProps = {
  showFilters: false,
  stays: staysData.sort((a, b) => b.rating - a.rating),
  filteredStays: staysData,
  filtersType: "",
  city: "",
  beds: 0,
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
          console.log("search ???", state.city);
          if (state.city == "") return { ...state, filteredStays: state.stays };
          const filtered = state.stays.filter((stay) => {
            let stayBeds = 0;
            if (stay.beds) {
              stayBeds = stay.beds;
            }
            return (
              state.city.toLowerCase() === stay.city.toLowerCase() &&
              state.beds >= stayBeds
            );
          });
          console.log("Filtered", filtered);
          return { ...state, filteredStays: filtered };
        case "SET_LOCATION":
          return { ...state, city: action.value };
        case "INCREMENT_BEDS":
          return { ...state, beds: state.beds + 1 };
        case "DECREMENT_BEDS": {
          if (state.beds > 0) {
            return { ...state, beds: state.beds - 1 };
          } else {
            return { ...state };
          }
        }
        default:
          throw Error("That action doesn't exist");
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, FilterType };
