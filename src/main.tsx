import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <ToastContainer />
    </QueryProvider>
  </StrictMode>
);
