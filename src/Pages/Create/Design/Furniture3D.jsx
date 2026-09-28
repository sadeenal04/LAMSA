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
  height = 0,
  color = "#ffffff",
  selectedFurnitureId,
  onSelect,
  onMove,
  setIsDragging,
}) {
  const { scene } = useGLTF(image);
  const { camera, gl } = useThree();

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const isSelected = id === selectedFurnitureId;

  const isDragging = useRef(false);
  const dragOffset = useRef(new THREE.Vector3());

  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.5));

  const modelData = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    return {
      box,
      size,
      center,
    };
  }, [clonedScene]);

  const normalizedScale = useMemo(() => {
    const largestHorizontal = Math.max(modelData.size.x, modelData.size.z);

    if (!largestHorizontal) {
      return 1;
    }

    return 3 / largestHorizontal;
  }, [modelData]);

  useEffect(() => {
    clonedScene.traverse((object) => {
      if (object.isMesh && object.material) {
        object.material.color.set(color);
      }
    });
  }, [clonedScene, color]);

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

    const width = modelData.size.x * normalizedScale * scale[0];

    const depth = modelData.size.z * normalizedScale * scale[2];

    const rotationY = rotation[1];

    const halfWidth =
      (Math.abs(Math.cos(rotationY)) * width +
        Math.abs(Math.sin(rotationY)) * depth) /
      2;

    const halfDepth =
      (Math.abs(Math.sin(rotationY)) * width +
        Math.abs(Math.cos(rotationY)) * depth) /
      2;

    const minX = roomMinX + halfWidth;
    const maxX = roomMaxX - halfWidth;

    const minZ = roomMinZ + halfDepth;
    const maxZ = roomMaxZ - halfDepth;

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

  const groupY = floorY - normalizedBottom * scale[1] + height;

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
        <primitive object={clonedScene} />
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
