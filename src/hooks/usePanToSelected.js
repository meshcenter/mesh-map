import { useEffect } from "react";

export function usePanToSelected(
  map,
  mapMetadata,
  nodeId,
  requestId,
  appointmentId
) {
  useEffect(() => {
    if (
      !map ||
      !mapMetadata.nodesById ||
      !mapMetadata.requestsById ||
      !mapMetadata.appointmentsById
    )
      return;
    if (nodeId) {
      const node = mapMetadata.nodesById[nodeId];
      if (!node) return;
      map.panTo({ lat: node.lat, lng: node.lng });
    } else if (requestId) {
      const request = mapMetadata.requestsById[requestId];
      if (!request) return;
      map.panTo({ lat: request.lat, lng: request.lng });
    } else if (appointmentId) {
      const appointment = mapMetadata.appointmentsById[appointmentId];
      if (!appointment) return;
      map.panTo({ lat: appointment.lat, lng: appointment.lng });
    }
  }, [nodeId, requestId, appointmentId, mapMetadata, map]);
}
