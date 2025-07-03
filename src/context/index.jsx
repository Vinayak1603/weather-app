import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("jaipur");
  const [thisLocation, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnName: 0,
      },
      headers: {
        "x-RapidAPI-key": import.meta.env.VITE_API_KEY,
        "x-RapidAPI-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const locationData = response.data.locations;
      const thisData = Object.values(locationData)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]); // Assuming currentConditions holds weather info
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider value={{ weather, thisLocation, setPlace, values }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
