import "./App.scss";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Flowers from "./pages/flowers/Flowers";
import Sightings from "./pages/sightings/Sightings";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flowers" element={<Flowers />} />
          <Route path="/sightings" element={<Sightings />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
