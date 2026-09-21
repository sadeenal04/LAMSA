import { useLocation } from "react-router-dom";
import { useState } from "react";
import spaces from "../../../Data/spaces";
import furniture from "../../../Data/furniture";
import SideBar from "./Sidebar";
import Options from "./Options";
import Navbar from "../../Home/Navbar";
import Copyright from "../../../components/Copyright";
import Room3D from "./Room3D";
import "../../../index.css";

function Design() {
  const location = useLocation();
  const design = location.state;
  const availableItems = spaces[design.space];

  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);

  const itemOptions = selectedItem ? furniture[selectedItem][design.style] : [];

  const handleAddItem = (option) => {
    const newItem = {
      id: Date.now(),
      image: option.model,
      position: [0, -2, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: "#ffffff",
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setSelectedFurnitureId(newItem.id);
  };

  const handleMove = (id, position) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              position,
            }
          : item,
      ),
    );
  };

  const handleDelete = () => {
    if (!selectedFurnitureId) {
      return;
    }

    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedFurnitureId),
    );

    setSelectedFurnitureId(null);
  };

  const handleDuplicate = () => {
    const selectedItem = items.find((item) => item.id === selectedFurnitureId);

    if (!selectedItem) {
      return;
    }

    const newItem = {
      ...selectedItem,
      id: Date.now(),
      position: [
        selectedItem.position[0] + 0.5,
        selectedItem.position[1],
        selectedItem.position[2] + 0.5,
      ],
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setSelectedFurnitureId(newItem.id);
  };

  const handleRotate = (amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedFurnitureId
          ? {
              ...item,
              rotation: [
                item.rotation[0],
                item.rotation[1] + amount,
                item.rotation[2],
              ],
            }
          : item,
      ),
    );
  };

  const handleResize = (amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedFurnitureId
          ? {
              ...item,
              scale: [
                Math.max(0.3, item.scale[0] + amount),
                Math.max(0.3, item.scale[1] + amount),
                Math.max(0.3, item.scale[2] + amount),
              ],
            }
          : item,
      ),
    );
  };

  const handleColorChange = (color) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedFurnitureId
          ? {
              ...item,
              color,
            }
          : item,
      ),
    );
  };

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

        <div className="design-workspace">
          <Options
            selectedItem={selectedItem}
            itemOptions={itemOptions}
            onAddItem={handleAddItem}
          />

          <Room3D
            items={items}
            selectedFurnitureId={selectedFurnitureId}
            setSelectedFurnitureId={setSelectedFurnitureId}
            onMove={handleMove}
            onRotate={handleRotate}
            onResize={handleResize}
            onColorChange={handleColorChange}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Copyright
        style={{
          backgroundColor: "var(--background)",
        }}
      />
    </div>
  );
}

export default Design;
