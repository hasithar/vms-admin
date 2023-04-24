import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  SvgIcon,
  Stack,
} from "@mui/material";
import styles from "./../styles/ParameterCard.module.scss";

const ParameterIcon = ({ icon }) => {
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
};

const ParameterCard = (props) => {
  const { title, description, icon, slug } = props;

  return (
    <Button
      component={Link}
      to={`${slug}`}
      variant="contained"
      color="primary"
      sx={{ p: 0, height: "100%", width: "100%" }}
    >
      <Card sx={{ backgroundColor: "transparent" }} className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Stack className={styles.cardIn}>
            <Box sx={{ borderRadius: "50%" }} className={styles.icon}>
              <ParameterIcon icon={icon} />
            </Box>

            {title && (
              <Typography variant="h5" className={styles.title}>
                {title}
              </Typography>
            )}
            <Typography variant="body2" className={styles.subtitle}>
              {description ? description : `Manage ${title}`}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Button>
  );
};

export default ParameterCard;

// import React from "react";
// import { Link } from "react-router-dom";

// import styles from "./ParameterCard.module.scss";

// export default ParameterCard;
