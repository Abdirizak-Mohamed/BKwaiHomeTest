import React from "react";
import Dashboard from "./containers/dashboard";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./App.css";

am4core.useTheme(am4themes_animated);

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
