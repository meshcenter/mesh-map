import { useState, useEffect } from "react";

// Calculate a map of item ids => item and node id => neighbor nodes
export function useMapMetadata(data) {
  const [cache, setCache] = useState({
    connectedNodes: null,
    nodesById: null,
    requestsById: null,
    appointmentsById: null,
  });

  useEffect(() => {
    if (!data.nodes) return;

    const nodesById = {};
    data.nodes.forEach((node) => {
      nodesById[node.id] = node;
    });

    const requestsById = {};
    data.requests &&
      data.requests.forEach((request) => {
        requestsById[request.id] = request;
      });

    const appointmentsById = {};
    data.appointments &&
      data.appointments.forEach((appointment) => {
        appointmentsById[appointment.id] = appointment;
      });

    const connectedNodes = {};
    data.links.forEach((link) => {
      const [nodeId1, nodeId2] = link.devices.map((d) => d.node_id);
      connectedNodes[nodeId1] = connectedNodes[nodeId1] || [];
      connectedNodes[nodeId2] = connectedNodes[nodeId2] || [];
      connectedNodes[nodeId1].push(nodesById[nodeId2]);
      connectedNodes[nodeId2].push(nodesById[nodeId1]);
    });

    setCache({
      connectedNodes,
      nodesById,
      requestsById,
      appointmentsById,
    });
  }, [data]);

  return cache;
}
