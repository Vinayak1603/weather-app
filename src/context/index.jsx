// React and axios imports
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const StateContext = createContext();

// This is the Provider component that wraps around <App />
export const StateContextProvider = ({ children }) => {
  // State hooks
  const [weather, setWeather] = useState({});         // Current weather data
  const [values, setValues] = useState([]);            // Hourly forecast data
  const [place, setPlace] = useState("jaipur");        // Default city to search
  const [thisLocation, setLocation] = useState("");    // Location name

  // Function to fetch weather data from the API
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",          // Grouping hourly data by 24h
        location: place,               // The city to search (dynamic)
        contentType: "json",
        unitGroup: "metric",           // Use Celsius
        shortColumnName: 0,
      },
      headers: {
        "x-RapidAPI-key": import.meta.env.VITE_API_KEY, // Secure API key from .env
        "x-RapidAPI-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);   // Make API call
      const locationData = response.data.locations;    // Extract location block
      const thisData = Object.values(locationData)[0]; // Get the first (and likely only) city result
      setLocation(thisData.address);                   // Store address
      setValues(thisData.values);                      // Store forecast data
      setWeather(thisData.values[0]);                  // Store current weather (first entry)
    } catch (e) {
      console.error(e);
      alert("This place does not exist");              // Error handling
    }
  };

  // This effect runs every time the `place` state changes
  useEffect(() => {
    fetchWeather(); // Fetch new weather data when city name changes
  }, [place]);

  // Optional: log values when they change
  useEffect(() => {
    console.log(values);
  }, [values]);

  // Provide the state and functions to the rest of the app
  return (
    <StateContext.Provider value={{ weather, thisLocation, setPlace, values }}>
      {children} {/* All app components inside here can now use the context */}
    </StateContext.Provider>
  );
};

// Custom hook to use the context in other components (like App.jsx)
export const useStateContext = () => useContext(StateContext);
