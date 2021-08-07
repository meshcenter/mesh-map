import React from "react";

import MeshMap from "mesh-map";
import "mesh-map/dist/index.css";
import "tachyons";

const data = {
  nodes: [],
  links: [],
  requests: [],
  appointments: [],
  los: [],
};

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "red" }}>
      <MeshMap data={data} />
    </div>
  );
};

export default App;
