import React from "react";

interface ButtonProps {
  doSlot: () => void;
}

function SpinButton(props: ButtonProps) {
  return (
    <section onClick={props.doSlot} id="Gira">
      ВРАЩАЙ
    </section>
  );
}

export default SpinButton;
