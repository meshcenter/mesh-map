import React from "react";

import LinkLine from "../markers/LinkLine";

function LinkLayer({ links }) {
  if (!links) return null;
  return links
    .filter((link) => link.status === "active")
    .map((link) => <LinkLine key={link.id} link={link} />);
}

export default React.memo(LinkLayer);
