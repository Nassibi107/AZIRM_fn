import { createSlice } from '@reduxjs/toolkit';

const initialSettings = JSON.parse(localStorage.getItem('settings')) || {
  direction: 'ltr',
  theme: 'light',
  responsiveFontSizes: true,
  mode: false,
  cof: false,
};
 
const initialState = {
  value: initialSettings.mode,
  key: 0,
};

export const ModeSlice = createSlice({
  name: 'mode',
  initialState: initialState,
  reducers: {
    getModeSimple: (state) => {
      state.value = false;
      const updatedSettings = { ...initialSettings, mode: false };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
    getModeComplex: (state) => {
      state.value = true;
      const updatedSettings = { ...initialSettings, mode: true };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
  },
});

export const { getModeSimple, getModeComplex } = ModeSlice.actions;
export default ModeSlice.reducer;
