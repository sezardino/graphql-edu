import ReactDOM from "react-dom/client";
import React from "react";
import { ApolloProvider } from "@apollo/client";

import { App } from "./App";
import { client } from "./apolloClient";
import "./index.css";
import { AuthProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
