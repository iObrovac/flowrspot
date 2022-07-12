import React, { useState, createContext, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Flowers from "./pages/flowers/Flowers";
import Sightings from "./pages/sightings/Sightings";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";
import { IContext, IUserData } from "../src/Types/IApp";
import FlowerInfo from "./pages/flowers/FlowerInfo";
import SightingInfo from "./pages/sightings/SightingInfo";
import { getDataAboutTheUser } from "./components/services/api";

const initalUserData = {
  name: "",
  lastName: "",
  password: "",
  email: "",
  dob: "",
  date_of_birth: "",
};

export const UserContext = createContext<IContext>({
  loggedIn: false,
  setLoggedIn: () => {},
  userData: initalUserData,
  setUserData: ({}: IUserData) => {},
});

const App: React.FC = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(initalUserData);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await getDataAboutTheUser();

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
            <Route path="/flowers/:id" element={<FlowerInfo />} />
            <Route path="/Sightings" element={<Sightings />} />
            <Route path="/Sightings/:id" element={<SightingInfo />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
