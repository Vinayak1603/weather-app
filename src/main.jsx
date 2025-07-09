// Import core React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Import root App component
import App from "./App.jsx";

// Import global styles
import "./index.css";

// Import custom context provider for state sharing
import { StateContextProvider } from "./context/index.jsx";

// Render the app inside the HTML element with id="root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the app in our custom context so all child components can access shared state */}
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
