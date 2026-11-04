import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  selectedCountry: "",
  states: [],
  selectedState: "",
  cities: [],
  selectedCity: "",
};

const locationSlice =createSlice({
    name:"location",
    initialState,
    reducers:{
        setCountries:(state,action)=>{
            state.countries = action.payload;
        },
        setSelectedCountry:(state,action)=>{
            state.selectedCountry=action.payload

        },
        setStates:(state,action)=>{
            state.states = action.payload

        },
        setSelectedState:(state,action)=>{
            state.selectedState = action.payload

        },
        setCities:(state,action)=>{
            state.cities = action.payload
        },
        setSelectedCity:(state,action)=>{
            state.selectedCity = action.payload
        }
    },

})

export const {
  setCountries,
  setSelectedCountry,
  setStates,
  setSelectedState,
  setCities,
  setSelectedCity,
} = locationSlice.actions;

export default locationSlice.reducer;