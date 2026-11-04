import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useEffectEvent } from "react";
import { setCountries, setSelectedCountry, setStates,setSelectedState,setCities,setSelectedCity,} from "./feature/location/locationSlice.js";
import { useSelector, useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
   const {
  countries,
  selectedCountry,
  states,
  selectedState,
  cities,
  selectedCity,
} = useSelector((state) => state.location);
  
  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCountries(data));
      })
      .catch((error) => {
        console.log("Error fetching countries", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCountry) {
      dispatch(setStates([]));
      return;
    }

    fetch(
      `https://location-selector.labs.crio.do/country=${selectedCountry}/states`,
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setStates(data));
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, [selectedCountry,dispatch]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) {
     dispatch(setCities([]));
      return;
    }
    fetch(
      `https://location-selector.labs.crio.do/country=${encodeURIComponent(selectedCountry)}/state=${encodeURIComponent(selectedState)}/cities`,
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("Cities API response:", data);
        dispatch(setCities(data));
      })
      .catch((error) => {
        console.log("Error Fetching error", error);
      });
  }, [selectedCountry, selectedState,dispatch]);

  return (
    <>
      <div>
        <h1>Location Selector</h1>
        <select
          value={selectedCountry}
          onChange={(e) => {
            dispatch(setSelectedCountry(e.target.value));
            dispatch(setSelectedState(""));
            dispatch(setSelectedCity(""));
            dispatch(setStates([]));
            dispatch(setCities([]));
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
            dispatch(setSelectedState(e.target.value));
            dispatch(setSelectedCity(""));
            dispatch(setCities([]))
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
          onChange={(e) => dispatch(setSelectedCity(e.target.value))}
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
            You selected {selectedCity}, {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
