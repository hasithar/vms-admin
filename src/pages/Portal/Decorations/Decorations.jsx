import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Model from "./Model"; /* highlight-line */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Container, Box, Typography, Stack, Button } from "@mui/material";
import deco from "@assets/images/elems/decos.jpg";

const PortalDecorations = () => {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Decorations
        </Typography>
        <Typography variant="body2">
          Plan and manage your wedding decos
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{ background: "#efefef", px: 2, py: 1, mb: 0, borderRadius: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ flex: 1 }}>&nbsp;</Box>
            <Button variant="contained" color="secondary">
              Inquire
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            background: "#efefef",
            px: 2,
            pt: 1,
            pb: 3,
            mb: 1,
            borderRadius: 1,
          }}
        >
          <img
            src={deco}
            alt=""
            style={{
              display: "block",
              maxWidth: "100%",
              height: "auto",
              margin: "auto",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PortalDecorations;

// const MyModel = () => {
//   const modelRef = useRef();

//   // Load the 3D model
//   useEffect(() => {
//     const loader = new GLTFLoader();
//     loader.load("/path/to/your/model.gltf", (gltf) => {
//       modelRef.current.add(gltf.scene);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>My 3D Model</h1>
//       <div ref={modelRef}></div>
//     </div>
//   );
// };

// const Two = () => {
//   return (
//     // <Canvas
//     //   camera={{ position: [2, 0, 12.25], fov: 15 }}
//     //   style={{
//     //     backgroundColor: "#111a21",
//     //     width: "100vw",
//     //     height: "100vh",
//     //   }}
//     // >
//     //   <ambientLight intensity={1.25} />
//     //   <ambientLight intensity={0.1} />
//     //   <directionalLight intensity={0.4} />
//     //   <Suspense fallback={null}>
//     //     {/* <Model position={[0.025, -0.9, 0]} /> */}
//     //   </Suspense>
//     //   <OrbitControls />
//     // </Canvas>

//   );
// };
