import { useState, createContext, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Flowers from "./pages/flowers/Flowers";
import Sightings from "./pages/sightings/Sightings";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";
import axios from "axios";
import { IContext, IUserData, IReturnValue } from "../src/Types/IApp";

export const UserContext = createContext<IContext>(null);

const App: React.FC = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get<IReturnValue>(
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
            <Route path="/Sightings" element={<Sightings />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
