// import React, { useState, useRef } from "react";
// import Draggable from "react-draggable";

// const PortalFloorPlan = () => {
//   const [positions, setPositions] = useState({});
//   const draggableRefs = [useRef(null), useRef(null)];

//   const handleSavePositions = () => {
//     const newPositions = {};
//     draggableRefs.forEach((ref, index) => {
//       const node = ref.current;
//       if (node) {
//         const { top, left } = node.getBoundingClientRect();
//         newPositions[index] = { top, left };
//       }
//     });
//     setPositions(newPositions);
//     console.log(newPositions);
//   };

//   return (
//     <div>
//       <button onClick={handleSavePositions}>Save Positions</button>
//       <div style={{ display: "flex" }}>
//         {[0, 1].map((index) => (
//           <Draggable nodeRef={draggableRefs[index]} key={index}>
//             <div
//               style={{
//                 width: 100,
//                 height: 100,
//                 backgroundColor: "red",
//                 margin: 10,
//               }}
//               ref={draggableRefs[index]}
//             >
//               <span>{`Draggable ${index}`}</span>
//             </div>
//           </Draggable>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PortalFloorPlan;

import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Container, Box, Stack, Button, Typography } from "@mui/material";
import styles from "./FloorPlan.module.scss";

const PortalFloorPlan = () => {
  const [positions, setPositions] = useState([]);
  const refList = useRef([]);

  const handleDrag = (index, position) => {
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = position;
      return newPositions;
    });
  };

  const handleSavePositions = () => {
    const positionsData = positions.map((pos) => {
      return {
        x: pos.x,
        y: pos.y,
      };
    });
    console.log(positionsData);
  };

  const handleSavePDF = () => {
    const pdf = new jsPDF();
    refList.current.forEach((ref, index) => {
      html2canvas(ref.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, 100, 100);
        if (index === refList.current.length - 1) {
          pdf.save("component-positions.pdf");
        } else {
          pdf.addPage();
        }
      });
    });
  };

  const boxes = ["Box 1", "Box 2", "Box 3"];

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component={"h1"}>
          Floor Plan
        </Typography>
        <Typography variant="body2">
          Plan and manage your wedding banquet hall layout
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{ background: "#efefef", px: 2, py: 1, mb: 2, borderRadius: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="body2">No of Guests Invited: 300</Typography>
            <Box sx={{ flex: 1 }}>&nbsp;</Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSavePDF}
            >
              Save as PDF
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePositions}
              sx={{ ml: 1 }}
            >
              Save Positions
            </Button>
          </Stack>
        </Box>

        <Box>
          {boxes.map((box, index) => {
            const ref = React.createRef();
            refList.current[index] = ref;
            return (
              <Draggable
                key={index}
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={(_, { x, y }) => handleDrag(index, { x, y })}
              >
                <Box className={styles.box} ref={ref}>
                  {box}
                </Box>
              </Draggable>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default PortalFloorPlan;
