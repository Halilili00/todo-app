import React from "react";
import Home from "./pages/Home";
import { StateContext } from "./context/StateContext";

function App() {
  return (
    <StateContext>
      <Home/>
    </StateContext>
  )
}

export default App;
