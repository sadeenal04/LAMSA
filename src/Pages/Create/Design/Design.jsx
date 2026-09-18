import { useLocation } from "react-router-dom";
import { useState } from "react";
import spaces from "../../../Data/spaces";
import SideBar from "./Sidebar";
import Canvas from "./Canvas";
import Navbar from "../../Home/Navbar";
import Copyright from "../../../components/Copyright";
import "../../../index.css";

function Design() {
  const location = useLocation();
  const design = location.state;
  const availableItems = spaces[design.space];
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCanvasItem, setSelectedCanvasItem] = useState(null);

  return (
    <div>
      <Navbar />

      <div className="design-page">
        <SideBar
          availableItems={availableItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          style={design.style}
        />

        <Canvas
          selectedItem={selectedItem}
          style={design.style}
          selectedCanvasItem={selectedCanvasItem}
          setSelectedCanvasItem={setSelectedCanvasItem}
        />
      </div>

      <Copyright style={{ backgroundColor: "var(--background)" }} />
    </div>
  );
}

export default Design;
