import React, { useState, useEffect } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

export const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2023, 3, 23, 9, 30),
    endDate: new Date(2023, 3, 23, 17, 30),
    descriptin: "lorem ipsum dolor sit amet",
    customer: "John Doe",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2023, 3, 20, 14, 10),
    endDate: new Date(2023, 3, 20, 15, 30),
    descriptin: "lorem ipsum dolor sit amet",
    customer: "John Doe",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2023, 3, 20, 16, 10),
    endDate: new Date(2023, 3, 20, 17, 30),
    descriptin: "lorem ipsum dolor sit amet",
    customer: "John Doe",
  },
];

export const weddings = [
  {
    title: "Brochure Design Review",
    startDate: new Date(2023, 3, 20, 14, 10),
    endDate: new Date(2023, 3, 20, 15, 30),
    descriptin: "lorem ipsum dolor sit amet",
    customer: "John Doe",
  },
  {
    title: "Brochure Design Review",
    startDate: new Date(2023, 3, 20, 16, 10),
    endDate: new Date(2023, 3, 20, 17, 30),
    descriptin: "lorem ipsum dolor sit amet",
    customer: "John Doe",
  },
];

const Appointment = ({ children, style, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: data?.type === "wedding" ? "#F42456" : "#93693E",
    }}
  >
    {children}
    {data?.customer}
    {data?.descriptin}
  </Appointments.Appointment>
);

const AppointmentCalendar = () => {
  const today = new Date();

  const [events, setEvents] = useState([]);

  const formatEvents = (appointments, weddings) => {
    let weddingsFormatted,
      appointmentsFormatted = [];

    weddingsFormatted = weddings.map((item) => {
      return {
        type: "wedding",
        ...item,
      };
    });

    appointmentsFormatted = appointments.map((item) => {
      return {
        type: "appointment",
        ...item,
      };
    });

    setEvents([...appointmentsFormatted, ...weddingsFormatted]);
  };

  useEffect(() => {
    formatEvents(appointments, weddings);
  }, []);

  // const history = useHistory();

  const handleDoubleClick = ({ data }) => {
    console.log(`Double-clicked date: ${data.startDate}`);
    // Call your custom function here
  };

  return (
    <div>
      {events && (
        <Scheduler data={events}>
          <ViewState defaultCurrentDate={today} />
          <MonthView onDoubleClick={handleDoubleClick} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={Appointment} />
          {/* <AppointmentTooltip showCloseButton showOpenButton /> */}
          {/* <AppointmentForm readOnly /> */}
        </Scheduler>
      )}
    </div>
  );
};

export default AppointmentCalendar;
