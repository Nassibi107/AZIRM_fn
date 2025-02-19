// store.js
import { configureStore } from '@reduxjs/toolkit';
import ModeSlice from './Sil/ModeSlice'; // Adjust the path as per your actual file structure
import CofMoe from "./Sil/CofSlice"; // Adjust the path as per your actual file structure

export const store = configureStore({
  reducer: {
    Mode: ModeSlice,
    Cof: CofMoe,
  }
});
