import React from "react";

import NodeMarker from "../markers/NodeMarker";

function NodeLayer({ nodes, selectedNode, onClick }) {
	if (!nodes) return null;
	return nodes.map((node) => (
		<NodeMarker
			key={`node-${node.id}`}
			node={node}
			selected={false}
			dimmed={false}
			onClick={onClick}
		/>
	));
}

export default React.memo(NodeLayer);
