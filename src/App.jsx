import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useEffectEvent } from "react";
import { use } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log("Error fetching countries", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }

    fetch(
      `https://location-selector.labs.crio.do/country=${selectedCountry}/states`,
    )
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) {
      setCities([]);
      return;
    }
    fetch(
      `https://location-selector.labs.crio.do/country=${encodeURIComponent(selectedCountry)}/state=${encodeURIComponent(selectedState)}/cities`,
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("Cities API response:", data);
        setCities(data);
      })
      .catch((error) => {
        console.log("Error Fetching error", error);
      });
  }, [selectedCountry, selectedState]);

  return (
    <>
      <div>
        <h1>Location Selector</h1>
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>{" "}
        <select
          value={selectedState}
          disabled={!selectedCountry}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
        >
          <option>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>{" "}
        <select
          value={selectedCity}
          disabled={!selectedState}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {selectedCity && selectedState && selectedCountry && (
          <p>
            You Selected {selectedCity} {selectedState} {selectedCountry}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
