import { useState, useEffect } from "react";

export function useFitToBounds(
  map,
  mapMetadata,
  nodeId,
  requestId,
  appointmentId
) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const { nodesById, requestsById, appointmentsById, connectedNodes } =
      mapMetadata;
    if (
      !map ||
      !nodesById ||
      !requestsById ||
      !appointmentsById ||
      !connectedNodes
    )
      return;

    if (!isFirstLoad) return;
    setIsFirstLoad(false);

    if (!nodeId && !requestId && !appointmentId) return;

    if (nodeId) {
      const newBounds = {
        east: -999,
        north: -999,
        south: 999,
        west: 999,
      };
      const node = nodesById[nodeId];
      if (!node) return;
      const neighbors = connectedNodes[nodeId];
      if (!neighbors) {
        map.setZoom(15);
        return;
      }
      [node, ...neighbors].forEach(({ lat, lng }) => {
        newBounds.west = Math.min(lng, newBounds.west);
        newBounds.east = Math.max(lng, newBounds.east);
        newBounds.south = Math.min(lat, newBounds.south);
        newBounds.north = Math.max(lat, newBounds.north);
      });
      map.fitBounds(newBounds);
    } else if (requestId) {
      const request = requestsById[requestId];
      if (!request) return;
      map.setZoom(15);
      return;
    } else if (appointmentId) {
      const appointment = appointmentsById[appointmentId];
      if (!appointment) return;
      map.setZoom(15);
    }
  }, [mapMetadata, map, nodeId, requestId, appointmentId, isFirstLoad]);
}
