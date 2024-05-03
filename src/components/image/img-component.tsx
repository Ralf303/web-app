import React from "react";

interface Props {
  src: string;
  alt: string;
}

const Img = (props: Props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={props.src}
        alt={props.alt}
        style={{ height: "250px", width: "250px" }}
      />
    </div>
  );
};

export default Img;
