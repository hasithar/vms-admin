import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { clearAlert } from "@/features/Common";
import { getAllAppointments } from "@features/Admin";
import { Stack, Typography } from "@mui/material";

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
      color: "#fff",
      textAlign: "center",
    }}
  >
    {/* {children} */}
    <Stack>
      <Typography sx={{ fontSize: "0.8rem" }}>
        {data?.customer?.name}
      </Typography>
      <Typography sx={{ fontSize: "0.7rem" }}> {data?.descriptin}</Typography>
    </Stack>
  </Appointments.Appointment>
);

const ReservationCalendar = () => {
  const today = new Date();
  const dispatch = useDispatch();

  const appointmentState = useSelector((state) => state.appointment);

  const [events, setEvents] = useState([]);

  const formatEvents = (weddings) => {
    let weddingsFormatted = [];

    weddingsFormatted = weddings.map((item) => {
      const date = new Date(item?.date);

      return {
        type: "wedding",
        title: "Wedding",
        startDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          9,
          0
        ),
        endDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          10,
          0
        ),
        descriptin: item?.comment,
        customer: item?.customer?.name,
        ...item,
      };
    });

    setEvents(weddingsFormatted);
  };

  useEffect(() => {
    formatEvents(weddings);
  }, []);

  // const history = useHistory();

  const handleDoubleClick = ({ data }) => {
    console.log(`Double-clicked date: ${data.startDate}`);
    // Call your custom function here
  };

  useEffect(() => {
    dispatch(clearAlert());
    dispatch(getAllAppointments());
  }, [dispatch]);

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

export default ReservationCalendar;
