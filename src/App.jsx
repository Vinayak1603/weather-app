import { useState } from "react"; // React hook for managing local state
import reactLogo from "./assets/react.svg"; // Asset import (unused)
import viteLogo from "/vite.svg"; // Asset import (unused)
import "./App.css"; // App-level CSS
import search from "./assets/icons/search.svg"; // Search icon
import { useStateContext } from "./context"; // Custom context hook
import { BackgroundLayout, WeatherCard, MiniCard } from "./components"; // Components

function App() {
  const [input, setInput] = useState(""); // Local state for input field
  const { weather, thisLocation, values, place, setPlace } = useStateContext(); 
  // Destructuring values from global context (weather data, current location, forecast, etc.)

  // Called when user submits a new city (presses Enter)
  const submitCity = () => {
    setPlace(input);     // Update the place in context
    setInput("");        // Clear the input field
  };

  return (
    <div className="w-full h-screen text-white px-8">
      {/* Navigation Bar */}
      <nav className="w-full p-3 flex justify-between items-center ">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>

        {/* Search Bar */}
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                submitCity(); // Submit city if Enter key is pressed
              }
            }}
            type="text"
            placeholder="search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update local state on input change
          />
        </div>
      </nav>

      {/* Background graphics/layout */}
      <BackgroundLayout />

      {/* Main Weather and Forecast Cards */}
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center ">
        {/* Main weather card */}
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatIndex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        {/* Hourly forecast mini cards (slice 1–6 means 6 hours) */}
        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime} // Unique key
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
