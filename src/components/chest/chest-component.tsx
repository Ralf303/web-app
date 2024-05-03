import React, { MouseEventHandler } from "react";

interface ChestProps {
  src: string;
  chestNumber: number;
  onSelect: (chestNumber: number) => void;
  isDisabled: boolean;
}

const Chest: React.FC<ChestProps> = ({
  src,
  chestNumber,
  onSelect,
  isDisabled,
}) => {
  const handleClick: MouseEventHandler<HTMLImageElement> = () => {
    if (!isDisabled) {
      onSelect(chestNumber);
    }
  };

  return (
    <div>
      <img
        src={src}
        alt="Chest"
        onClick={handleClick}
        className={isDisabled ? "disabled" : ""}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default Chest;
