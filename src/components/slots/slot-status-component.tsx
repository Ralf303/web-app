import React from "react";

interface Props {
  status: string;
}

function Status(prop: Props) {
  return <section id="status">{prop.status}</section>;
}

export default Status;
