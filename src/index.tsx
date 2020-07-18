import React from "react";
import "material-design-icons";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-montserrat";
import "typeface-muli";
import { StateProvider } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
