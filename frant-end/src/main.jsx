import React from "react";
import ReactDOM from "react-dom/client";
import SettingsProvider from "@/contexts/settingsContext";
import App from "./App";
import  "./ycss.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "nprogress/nprogress.css";

import "react-quill/dist/quill.snow.css";

import "simplebar-react/dist/simplebar.min.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Provider } from "react-redux";
import { store } from "@/___GlobalState__/Store";
import UserContext from "@/contexts/UserContext";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode>
  <Provider store={store} >
  <SettingsProvider>
      <App />
    </SettingsProvider>
    </Provider>
  </React.StrictMode>);

  