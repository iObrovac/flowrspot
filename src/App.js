import { useState, createContext, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Flowers from "./pages/flowers/Flowers";
import Sightings from "./pages/sightings/Sightings";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://flowrspot-api.herokuapp.com/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUserData({
        name: response.data.user.first_name,
        lastName: response.data.user.last_name,
      });
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchData();
    }
  }, []);

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
    </div>
  );
}

export default App;
