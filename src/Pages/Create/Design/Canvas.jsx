import { useState, useEffect } from "react";
import furniture from "../../../Data/furniture";
import Item from "./Item";

function Canvas({ selectedItem, style }) {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const itemOptions = selectedItem ? furniture[selectedItem][style] : [];

  useEffect(() => {
    if (!selectedItem || !itemOptions.length) {
      return;
    }

    setItems((prevItems) => {
      const alreadyExists = prevItems.some(
        (item) => item.name === selectedItem,
      );

      if (alreadyExists) {
        return prevItems;
      }

      return [
        ...prevItems,
        {
          id: Date.now(),
          name: selectedItem,
          item: itemOptions[0],
          position: {
            x: 100,
            y: 100,
          },
          size: 200,
          rotation: 0,
          color: "#ffffff",
        },
      ];
    });
  }, [selectedItem, style]);

  const handleAddItem = () => {
    if (!itemOptions.length) {
      return;
    }

    const newItem = {
      id: Date.now(),
      name: selectedItem,
      item: itemOptions[0],
      position: {
        x: 150,
        y: 150,
      },
      size: 200,
      rotation: 0,
      color: "#ffffff",
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDuplicate = (id) => {
    setItems((prevItems) => {
      const itemToDuplicate = prevItems.find((item) => item.id === id);

      if (!itemToDuplicate) {
        return prevItems;
      }

      const newItem = {
        ...itemToDuplicate,
        id: Date.now(),
        position: {
          x: itemToDuplicate.position.x + 30,
          y: itemToDuplicate.position.y + 30,
        },
      };

      return [...prevItems, newItem];
    });
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    setSelectedItemId(null);
  };

  const updateItem = (id, changes) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
            }
          : item,
      ),
    );
  };

  return (
    <div className="design-canvas" onMouseDown={() => setSelectedItemId(null)}>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item.item}
          alt={item.name}
          position={item.position}
          size={item.size}
          rotation={item.rotation}
          color={item.color}
          setPosition={(position) => updateItem(item.id, { position })}
          setSize={(size) => updateItem(item.id, { size })}
          setRotation={(rotation) => updateItem(item.id, { rotation })}
          setColor={(color) => updateItem(item.id, { color })}
          onDuplicate={() => handleDuplicate(item.id)}
          onDelete={() => handleDelete(item.id)}
          isSelected={selectedItemId === item.id}
          onSelect={() => setSelectedItemId(item.id)}
        />
      ))}
    </div>
  );
}

export default Canvas;
