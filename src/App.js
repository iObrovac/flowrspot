import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Flowers from "./pages/flowers/Flowers";
import Sightings from "./pages/sightings/Sightings";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";
import { useState, createContext } from "react";

export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  return (
    <div className="App">
      <UserContext.Provider
        value={{ loggedIn, setLoggedIn, userData, setUserData }}
      >
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/sightings" element={<Sightings />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

      <button className="proba-btn">
        {loggedIn ? "Logged In" : "Logged Out"}
      </button>
    </div>
  );
}

export default App;
