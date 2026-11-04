import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../feature/location/locationSlice.js'

const store = configureStore({
    reducer:{location:locationReducer}
})

export default store;