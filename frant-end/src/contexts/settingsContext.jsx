import React, { createContext } from "react";
import { THEMES } from "@/utils/constants";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialSettings = {
  direction: "ltr",
  theme: THEMES.DARK,
  responsiveFontSizes: true,
  mode : true,
  cof : false
};

export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: arg => {}
});

const SettingsProvider = ({ children }) => {
  const storage = useLocalStorage("settings", initialSettings);
  const { data: settings, storeData: setStoreSettings } = storage;

  const saveSettings = updateSettings => setStoreSettings(updateSettings);

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
