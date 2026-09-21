import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import Create from "./Pages/Create/Create";
import Design from "./Pages/Create/Design/Design";
import Contact from "./Pages/Home/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/create/design" element={<Design />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
