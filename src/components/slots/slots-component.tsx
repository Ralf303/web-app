import React from "react";

interface SlotProps {
  id: string;
  className: string;
}

function Slot(props: SlotProps) {
  return <div id={props.id} className={props.className}></div>;
}

function Slots() {
  return (
    <section id="Slots">
      <Slot id="slot1" className="a1" />
      <Slot id="slot2" className="a1" />
      <Slot id="slot3" className="a1" />
    </section>
  );
}
export default Slots;
