import React from "react";

import AppointmentMarker from "../markers/AppointmentMarker";

function AppointmentLayer({
  appointments,
  selectedAppointment,
  selectedNode,
  onClick,
}) {
  if (!appointments) return null;
  return appointments.map((appointment) => (
    <AppointmentMarker
      key={appointment.id}
      appointment={appointment}
      onClick={onClick}
    />
  ));
}

export default React.memo(AppointmentLayer);
