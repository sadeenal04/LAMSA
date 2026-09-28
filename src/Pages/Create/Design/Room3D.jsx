import { useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Furniture3D from "./Furniture3D";
import "../../../index.css";

function Room({ hiddenWall }) {
  return (
    <>
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#d3bba5" />
      </mesh>

      <mesh position={[0, 1, -6]} visible={hiddenWall !== "back"}>
        <boxGeometry args={[12, 7, 0.2]} />
        <meshStandardMaterial color="#eee5dc" />
      </mesh>

      <mesh
        position={[-6, 1, 0]}
        rotation={[0, Math.PI / 2, 0]}
        visible={hiddenWall !== "left"}
      >
        <boxGeometry args={[12, 7, 0.2]} />
        <meshStandardMaterial color="#eee5dc" />
      </mesh>

      <mesh
        position={[6, 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        visible={hiddenWall !== "right"}
      >
        <boxGeometry args={[12, 7, 0.2]} />
        <meshStandardMaterial color="#eee5dc" />
      </mesh>

      <mesh position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f5eee8" />
      </mesh>

      <ambientLight intensity={1.2} />

      <directionalLight position={[3, 6, 4]} intensity={2} castShadow />

      <pointLight position={[0, 3, 0]} intensity={1} distance={10} />
    </>
  );
}

function RoomCamera({ setHiddenWall }) {
  const { camera } = useThree();

  useFrame(() => {
    if (camera.position.z < -6) {
      setHiddenWall("back");
    } else if (camera.position.x > 0.5) {
      setHiddenWall("right");
    } else if (camera.position.x < -0.5) {
      setHiddenWall("left");
    } else {
      setHiddenWall(null);
    }
  });

  return null;
}

function Room3D({
  items,
  selectedFurnitureId,
  setSelectedFurnitureId,
  onMove,
  onRotate,
  onResize,
  onColorChange,
  onDuplicate,
  onDelete,
  onReset,
  onHeight,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [hiddenWall, setHiddenWall] = useState(null);

  const selectedFurniture = items.find(
    (item) => item.id === selectedFurnitureId,
  );

  const handleDownload = () => {
    const canvas = document.querySelector(".room-3d canvas");

    if (!canvas) {
      return;
    }

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "lamsa-design.png";
    link.href = image;
    link.click();
  };

  return (
    <div className="room-3d">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: [7, 4, 7],
          fov: 55,
        }}
        onPointerMissed={() => {
          setSelectedFurnitureId(null);
        }}
      >
        <Room hiddenWall={hiddenWall} />

        <RoomCamera setHiddenWall={setHiddenWall} />

        {items.map((item) => {
          if (!item.image || !item.image.endsWith(".glb")) {
            return null;
          }

          return (
            <Furniture3D
              key={item.id}
              id={item.id}
              image={item.image}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              height={item.height}
              color={item.color}
              selectedFurnitureId={selectedFurnitureId}
              onSelect={setSelectedFurnitureId}
              onMove={onMove}
              setIsDragging={setIsDragging}
            />
          );
        })}

        <OrbitControls
          enablePan={false}
          enabled={!isDragging}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>

      <div className="room-actions">
        <button type="button" className="reset-design-btn" onClick={onReset}>
          Reset
        </button>

        <button
          type="button"
          className="download-design-btn"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      {selectedFurniture && (
        <div className="furniture-toolbar">
          <button
            type="button"
            onClick={() => onRotate(Math.PI / 12)}
            aria-label="Rotate left"
            title="Rotate left"
          >
            ↶
          </button>

          <button
            type="button"
            onClick={() => onRotate(-Math.PI / 12)}
            aria-label="Rotate right"
            title="Rotate right"
          >
            ↷
          </button>

          <button
            type="button"
            onClick={() => onResize(-0.1)}
            aria-label="Decrease size"
            title="Decrease size"
          >
            −
          </button>

          <button
            type="button"
            onClick={() => onHeight(0.2)}
            aria-label="Raise furniture"
            title="Raise furniture"
          >
            ↑
          </button>

          <input
            type="color"
            value={selectedFurniture.color}
            onChange={(event) => onColorChange(event.target.value)}
            aria-label="Change furniture color"
            title="Change furniture color"
          />

          <button
            type="button"
            onClick={() => onHeight(-0.2)}
            aria-label="Lower furniture"
            title="Lower furniture"
          >
            ↓
          </button>

          <button
            type="button"
            onClick={() => onResize(0.1)}
            aria-label="Increase size"
            title="Increase size"
          >
            +
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            aria-label="Duplicate furniture"
            title="Duplicate furniture"
          >
            ⧉
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete furniture"
            title="Delete furniture"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default Room3D;
