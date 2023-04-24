import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Container, Box, Stack, Button, Typography } from "@mui/material";
import headTableImg from "@assets/images/elems/head_table.png";
import longTableImg from "@assets/images/elems/long_table.png";
import roundTableImg from "@assets/images/elems/round_table.png";
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

  const headetables = ["Headtable"];
  const longTables = [
    "Longtable 1",
    "Longtable 2",
    "Longtable 3",
    "Longtable 4",
    "Longtable 5",
    "Longtable 6",
    "Longtable 7",
    "Longtable 8",
    "Longtable 9",
    "Longtable 10",
    "Longtable 11",
    "Longtable 12",
    "Longtable 13",
    "Longtable 14",
    "Longtable 15",
    "Longtable 16",
    "Longtable 17",
    "Longtable 18",
    "Longtable 19",
    "Longtable 20",
  ];
  const roundTables = [
    "Roundtable 1",
    "Roundtable 2",
    "Roundtable 3",
    "Roundtable 4",
    "Roundtable 5",
    "Roundtable 6",
    "Roundtable 7",
    "Roundtable 8",
    "Roundtable 9",
    "Roundtable 10",
    "Roundtable 11",
    "Roundtable 12",
    "Roundtable 13",
    "Roundtable 14",
    "Roundtable 15",
    "Roundtable 16",
    "Roundtable 17",
    "Roundtable 18",
    "Roundtable 19",
    "Roundtable 20",
  ];

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

        <Box className={styles.area}>
          <Box className={styles.itemset}>
            {headetables.map((box, index) => {
              const ref = React.createRef();
              refList.current[index] = ref;
              return (
                <Draggable
                  key={index}
                  defaultPosition={{ x: 0, y: 0 }}
                  onDrag={(_, { x, y }) => handleDrag(index, { x, y })}
                >
                  <Box className={styles.box} ref={ref}>
                    <Box className={styles.boxin}>
                      <img src={headTableImg} alt="head_table" />
                      {box}
                    </Box>
                  </Box>
                </Draggable>
              );
            })}
          </Box>

          <Box className={styles.itemset}>
            {longTables.map((box, index) => {
              const ref = React.createRef();
              refList.current[index] = ref;
              return (
                <Draggable
                  key={index}
                  defaultPosition={{ x: 0, y: 0 }}
                  onDrag={(_, { x, y }) => handleDrag(index, { x, y })}
                >
                  <Box className={styles.box} ref={ref}>
                    <Box className={styles.boxin}>
                      <img src={longTableImg} alt="long_table" />
                      {box}
                    </Box>
                  </Box>
                </Draggable>
              );
            })}
          </Box>

          <Box className={styles.itemset}>
            {roundTables.map((box, index) => {
              const ref = React.createRef();
              refList.current[index] = ref;
              return (
                <Draggable
                  key={index}
                  defaultPosition={{ x: 0, y: 0 }}
                  onDrag={(_, { x, y }) => handleDrag(index, { x, y })}
                >
                  <Box className={styles.box} ref={ref}>
                    <Box className={styles.boxin}>
                      <img src={roundTableImg} alt="round_table" />
                      {box}
                    </Box>
                  </Box>
                </Draggable>
              );
            })}
          </Box>

          <Box className={styles.floor}></Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PortalFloorPlan;
