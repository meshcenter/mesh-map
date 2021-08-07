import React from "react";

import RequestMarker from "../markers/RequestMarker";

function RequestLayer({ requests, selectedRequest, selectedNode, onClick }) {
  if (!requests) return null;
  return requests.map((request) => (
    <RequestMarker
      key={"request-" + request.id}
      request={request}
      onClick={onClick}
    />
  ));
}

export default React.memo(RequestLayer);
