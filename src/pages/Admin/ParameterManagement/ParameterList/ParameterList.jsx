import React from "react";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Button, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import UINavTabs from "@/components/UI/UINavTabs/UINavTabs.component";
import { ParameterTable } from "@/features/Admin";

import { parameterTypes } from "@/constants";

const ParameterList = () => {
  const { parameter } = useParams();
  const currentParameter = parameterTypes.filter((pt) => pt.slug === parameter);
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const pageprops = {
    title: `${currentParameter[0]?.title}`,
    breadcrumbs: [
      {
        title: "Parameter Management",
        href: "parameters",
      },
      {
        title: "All Parameters",
        href: "parameters",
      },
      {
        title: `${currentParameter[0]?.title}`,
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Parameter",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: `Add New ${currentParameter[0]?.titleSingular}`,
              href: `/admin/parameters/${currentParameter[0]?.slug}/add`,
            },
          ],
        },
      },
    },
  };

  return (
    <Page pageprops={pageprops}>
      <BoxedContent title="" subtitle="" description="" edge>
        {/* <UserTable /> */}

        <Grid container spacing="2">
          {isDesktop && (
            <Grid item xs={3} xl={2}>
              <UINavTabs
                categories={parameterTypes}
                selected={currentParameter[0]?.id}
                labelField="title"
              />
            </Grid>
          )}

          <Grid item xs={12} lg={9} xl={10}>
            <BoxedContent
              title={currentParameter[0]?.title}
              subtitle=""
              description=""
            >
              <ParameterTable />
            </BoxedContent>
          </Grid>

          {!isDesktop && (
            <Grid item xs={12}>
              <Stack
                sx={{
                  mt: 2,
                }}
              >
                <Link to="/admin/parameters" style={{ display: "block" }}>
                  <Button
                    size="medium"
                    startIcon={<ArrowBackIcon size="small" />}
                    sx={{ textTransform: "none" }}
                  >
                    Back
                  </Button>
                </Link>
              </Stack>
            </Grid>
          )}
        </Grid>
      </BoxedContent>
    </Page>
  );
};

export default ParameterList;
