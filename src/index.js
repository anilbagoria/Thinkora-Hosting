import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#161D29",
              color: "#F1F2FF",
              border: "1px solid #FFD60A",
              boxShadow: "0 18px 50px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#FFD60A",
                secondary: "#161D29",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF476F",
                secondary: "#161D29",
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
