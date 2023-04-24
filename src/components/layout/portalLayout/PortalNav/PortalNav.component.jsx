import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  SvgIcon,
  Stack,
} from "@mui/material";
import { portalLinks } from "@/constants";
import styles from "./PortalNav.module.scss";

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
      color="default"
      sx={{ p: 0, height: "100%", width: "100%" }}
    >
      <Card sx={{ backgroundColor: "transparent" }} className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Stack className={styles.cardIn} direction={"row"}>
            <Box sx={{ borderRadius: "50%" }} className={styles.icon}>
              <ParameterIcon icon={icon} />
            </Box>

            <Box>
              {title && (
                <Typography variant="h5" className={styles.title}>
                  {title}
                </Typography>
              )}
              <Typography variant="body2" className={styles.subtitle}>
                {description ? description : `Manage ${title}`}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Button>
  );
};

const PortalNav = () => {
  return (
    <Box className={styles.outer}>
      <Container>
        <Grid container spacing={2}>
          {portalLinks.map((parameter) => (
            <Grid
              item
              key={parameter.id}
              sx={{
                flexBasis: { lg: "20%", xl: "16.6666%" },
                maxWidth: { lg: "20%", xl: "16.6666%" },
              }}
            >
              <ParameterCard
                title={parameter.title}
                description={parameter.description}
                icon={parameter.icon}
                slug={parameter.slug}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PortalNav;
