import React from "react";
import Page from "@/components/layout/pageLayout/Page/Page.component";
import BoxedContent from "@/components/layout/pageLayout/BoxedContent/BoxedContent.component";
import { ReservationCalendar } from "@/features/Admin";

const ReservationList = () => {
  const pageprops = {
    title: "Reservations",
    breadcrumbs: [
      {
        title: "Reservations",
        href: "reservations",
      },
      {
        title: "All Reservations",
        href: "",
      },
    ],
    widgets: {
      header: {
        search: {
          active: false,
          label: "Reservation",
        },
        buttons: {
          active: true,
          links: [
            {
              type: "add",
              color: "primary",
              label: "Add New Reservation",
              href: "/admin/reservations/add",
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
          <ReservationCalendar />
        </BoxedContent>
      </Page>
    </>
  );
};

export default ReservationList;
