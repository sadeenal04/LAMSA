import { useState, useRef, useEffect } from "react";

function Item({
  item,
  alt,
  position,
  size,
  rotation,
  color,
  setPosition,
  setSize,
  setRotation,
  setColor,
  onDuplicate,
  onDelete,
  isSelected,
  onSelect,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [coloredImage, setColoredImage] = useState(item);

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const itemRef = useRef(null);
  const resizeStartX = useRef(0);
  const resizeStartSize = useRef(size);

  const hexToRgb = (hex) => {
    const value = hex.replace("#", "");

    return {
      r: parseInt(value.substring(0, 2), 16),
      g: parseInt(value.substring(2, 4), 16),
      b: parseInt(value.substring(4, 6), 16),
    };
  };

  useEffect(() => {
    const image = new Image();

    image.src = item;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const pixels = imageData.data;
      const rgb = hexToRgb(color);

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const alpha = pixels[i + 3];

        if (alpha === 0) {
          continue;
        }

        const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

        pixels[i] = rgb.r * brightness;
        pixels[i + 1] = rgb.g * brightness;
        pixels[i + 2] = rgb.b * brightness;
      }

      context.putImageData(imageData, 0, 0);

      setColoredImage(canvas.toDataURL());
    };
  }, [item, color]);

  const handleMouseMove = (event) => {
    const canvas = itemRef.current.parentElement;
    const canvasRect = canvas.getBoundingClientRect();

    const x = event.clientX - canvasRect.left - offset.x;
    const y = event.clientY - canvasRect.top - offset.y;

    setPosition({
      x,
      y,
    });
  };

  const handleResize = (event) => {
    const difference = event.clientX - resizeStartX.current;

    const newSize = Math.max(50, resizeStartSize.current + difference);

    setSize(newSize);
  };

  const handleRotate = (event) => {
    const rect = itemRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle =
      Math.atan2(event.clientY - centerY, event.clientX - centerX) *
      (180 / Math.PI);

    setRotation(angle + 90);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mousemove", handleRotate);
  };

  const handleDragStart = (event) => {
    event.stopPropagation();

    onSelect();
    setIsDragging(true);

    const canvas = itemRef.current.parentElement;
    const canvasRect = canvas.getBoundingClientRect();

    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    setOffset({
      x: x - position.x,
      y: y - position.y,
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeStart = (event) => {
    event.stopPropagation();
    event.preventDefault();

    onSelect();
    setIsDragging(true);

    resizeStartX.current = event.clientX;
    resizeStartSize.current = size;

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleRotateStart = (event) => {
    event.stopPropagation();
    event.preventDefault();

    onSelect();
    setIsDragging(true);

    window.addEventListener("mousemove", handleRotate);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDuplicateClick = (event) => {
    event.stopPropagation();
    onDuplicate();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={itemRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        transform: `rotate(${rotation}deg)`,
        outline: isSelected ? "2px solid var(--accent)" : "none",
      }}
      onMouseDown={handleDragStart}
    >
      {isSelected && (
        <>
          <input
            className="item-color-picker"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            onMouseDown={(event) => event.stopPropagation()}
          />

          <button
            className="item-tool item-rotate"
            onMouseDown={handleRotateStart}
          >
            ↻
          </button>

          <button
            className="item-tool item-duplicate"
            onMouseDown={handleDuplicateClick}
          >
            +
          </button>

          <button
            className="item-tool item-delete"
            onMouseDown={handleDeleteClick}
          >
            ×
          </button>

          <button
            className="item-tool item-resize"
            onMouseDown={handleResizeStart}
          />
        </>
      )}

      <img
        src={coloredImage}
        alt={alt}
        style={{
          width: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

export default Item;
