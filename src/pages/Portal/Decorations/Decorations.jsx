import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Model from "./Model"; /* highlight-line */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const PortalDecorations = () => {
  return <div>PortalDecorations</div>;
};

export default PortalDecorations;

const MyModel = () => {
  const modelRef = useRef();

  // Load the 3D model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/path/to/your/model.gltf", (gltf) => {
      modelRef.current.add(gltf.scene);
    });
  }, []);

  return (
    <div>
      <h1>My 3D Model</h1>
      <div ref={modelRef}></div>
    </div>
  );
};

const Two = () => {
  return (
    <Canvas
      camera={{ position: [2, 0, 12.25], fov: 15 }}
      style={{
        backgroundColor: "#111a21",
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        {/* <Model position={[0.025, -0.9, 0]} /> */}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};
