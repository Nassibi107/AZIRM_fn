import { createSlice } from '@reduxjs/toolkit';

const initialSettings = JSON.parse(localStorage.getItem('settings')) || {
  direction: 'ltr',
  theme: 'light',
  responsiveFontSizes: true,
  mode: true,
  cof: false,
};

const initialState = {
  value: initialSettings.cof,
  key: 0,
};

export const CofSlice = createSlice({
  name: 'cof',
  initialState: initialState,
  reducers: {
    getSetupOn: (state) => {
      state.value = false;
      const updatedSettings = { ...initialSettings, cof: false };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
    getSetupOff: (state) => {
      state.value = true;
      const updatedSettings = { ...initialSettings, cof: true };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
    getSetupComplexMode: (state) => {
      state.value = false;
      const updatedSettings = { ...initialSettings, mode: false };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
    getSetupSimpleMode: (state) => {
      state.value = true;
      const updatedSettings = { ...initialSettings, mode: true };
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
    getSetupMenuNavigations: (state) => {
      state.value = state;
      const updatedSettings = { ...initialSettings, Menu: state};
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
    },
  },
});

export const { getSetupOn, getSetupOff, getSetupComplexMode, getSetupSimpleMode , getSetupMenuNavigations} = CofSlice.actions;
export default CofSlice.reducer;
