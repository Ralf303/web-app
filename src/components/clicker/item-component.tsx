import React from "react";

const Item = ({ name }: { name: string }) => {
  return (
    <div id="item">
      <p>{name}</p>
    </div>
  );
};

export default Item;
