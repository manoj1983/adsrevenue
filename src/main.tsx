// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // (Aapki file ka naam globals.css bhi ho sakta hai)

// 💡 1. React Query se zaroori cheezein import karein
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 💡 2. Naya Query Client banayein
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minute tak data ko fresh maanein
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 💡 3. Poori App ko <QueryClientProvider> se wrap karein */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
