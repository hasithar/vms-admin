import React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { format } from "date-fns";

const currentDate = format(new Date(), "yyyy-MM-dd");
export const appointments = [
  {
    title: "Wedding",
    customer: "John Doe",
    startDate: new Date(2023, 3, 24, 8, 0),
    endDate: new Date(2023, 3, 24, 15, 0),
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2023, 3, 23, 12, 0),
    endDate: new Date(2023, 3, 23, 13, 0),
  },
];

const Appointment = ({ children, style, data, ...restProps }) => {
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#FFC107",
        borderRadius: "8px",
      }}
    >
      {children}
      {data?.customer}
    </Appointments.Appointment>
  );
};

const ReservationCalendar = () => {
  return (
    <div>
      <Scheduler data={appointments}>
        <ViewState defaultCurrentDate={currentDate} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm readOnly />
      </Scheduler>
    </div>
  );
};

export default ReservationCalendar;
