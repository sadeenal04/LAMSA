import { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function Furniture3D({
  id,
  image,
  position = [0, -2, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = "#ffffff",
  selectedFurnitureId,
  onSelect,
  onMove,
  setIsDragging,
}) {
  const { scene } = useGLTF(image);
  const { camera, gl } = useThree();

  const isSelected = id === selectedFurnitureId;

  const isDragging = useRef(false);
  const dragOffset = useRef(new THREE.Vector3());

  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.5));

  const modelData = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    return {
      box,
      size,
      center,
    };
  }, [scene]);

  const normalizedScale = useMemo(() => {
    const largestHorizontal = Math.max(modelData.size.x, modelData.size.z);

    if (!largestHorizontal) {
      return 1;
    }

    return 3 / largestHorizontal;
  }, [modelData]);

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh && object.material) {
        object.material.color.set(color);
      }
    });
  }, [scene, color]);

  const getMousePositionOnFloor = (event) => {
    const rect = gl.domElement.getBoundingClientRect();

    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );

    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    const point = new THREE.Vector3();

    const hit = raycaster.ray.intersectPlane(dragPlane.current, point);

    return hit ? point : null;
  };

  const handlePointerDown = (event) => {
    event.stopPropagation();

    onSelect(id);

    const point = getMousePositionOnFloor(event);

    if (!point) {
      return;
    }

    dragOffset.current.set(position[0] - point.x, 0, position[2] - point.z);

    isDragging.current = true;

    setIsDragging(true);

    gl.domElement.style.cursor = "grabbing";

    event.target.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) {
      return;
    }

    event.stopPropagation();

    const point = getMousePositionOnFloor(event);

    if (!point) {
      return;
    }

    const newX = point.x + dragOffset.current.x;
    const newZ = point.z + dragOffset.current.z;

    const roomMinX = -6;
    const roomMaxX = 6;
    const roomMinZ = -6;
    const roomMaxZ = 6;

    const sofaWidth = 3;
    const sofaDepth = 2;

    const rotated = Math.abs(Math.sin(rotation[1])) > 0.5;

    const halfWidth = ((rotated ? sofaDepth : sofaWidth) * scale[0]) / 2;

    const halfDepth = ((rotated ? sofaWidth : sofaDepth) * scale[2]) / 2;

    const leftWallGap = 1.5;
    const rightWallGap = 0;
    const backWallGap = 0;
    const frontWallGap = 0;

    const minX = roomMinX + halfWidth + leftWallGap;

    const maxX = roomMaxX - halfWidth - rightWallGap;

    const minZ = roomMinZ + halfDepth + backWallGap;

    const maxZ = roomMaxZ - halfDepth - frontWallGap;

    const clampedX = THREE.MathUtils.clamp(newX, minX, maxX);

    const clampedZ = THREE.MathUtils.clamp(newZ, minZ, maxZ);

    onMove(id, [clampedX, position[1], clampedZ]);
  };

  const handlePointerUp = (event) => {
    if (!isDragging.current) {
      return;
    }

    event.stopPropagation();

    isDragging.current = false;

    setIsDragging(false);

    gl.domElement.style.cursor = "default";

    if (event.target.hasPointerCapture(event.pointerId)) {
      event.target.releasePointerCapture(event.pointerId);
    }
  };

  const floorY = -2.5;
  const normalizedBottom = -0.5;

  const groupY = floorY - normalizedBottom * scale[1];

  return (
    <group
      position={[position[0], groupY, position[2]]}
      rotation={rotation}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <group
        scale={normalizedScale}
        position={[
          -modelData.center.x,
          -0.5 - modelData.box.min.y * normalizedScale,
          -modelData.center.z,
        ]}
      >
        <primitive object={scene} />
      </group>

      {isSelected && (
        <mesh
          position={[0, (-0.5 + 0.02) / scale[1], 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[2, 2.08, 64]} />

          <meshBasicMaterial color="#af5a5b" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

export default Furniture3D;
