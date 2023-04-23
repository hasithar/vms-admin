import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { AppointmentCalendar } from "@/features/Admin";

const AppointmentList = () => {
  const pageprops = {
    title: "Appointments",
    breadcrumbs: [
      {
        title: "Appointments",
        href: "appointments",
      },
      {
        title: "All Appointments",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Appointment",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: "Add New Appointment",
              href: "/admin/appointments/add",
            },
          ],
        },
      },
    },
  };

  return (
    <>
      <Page pageprops={pageprops}>
        <BoxedContent title="" subtitle="" description="">
          <AppointmentCalendar />
        </BoxedContent>
      </Page>
    </>
  );
};

export default AppointmentList;
