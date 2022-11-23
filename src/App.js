import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import TravelLog from "./components/TravelLog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <div className="App">{isLoggedIn ? <Login /> : <TravelLog />}</div>;
}

export default App;
