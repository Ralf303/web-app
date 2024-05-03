import React, { useState } from "react";
import Count from "../../types/clickerTypes";
import Item from "./item-component";
import Inventory from "./inventory-component";
import digService from "../../services/dig-service";

const Clicker = () => {
  const [itemName, setItemName] = useState<string>("Ты добыл: ");
  const [count, setCount] = useState<Count>({ stone: 0, iron: 0, gold: 0 });

  const dig = () => {
    const { item, itemName } = digService.dig();
    setItemName(`Ты добыл: ${item}`);
    if (itemName === "stone") {
      setCount({ ...count, stone: count.stone + 1 });
    } else if (itemName === "iron") {
      setCount({ ...count, iron: count.iron + 1 });
    } else if (itemName === "gold") {
      setCount({ ...count, gold: count.gold + 1 });
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Шахта</h1>
      <button id="button" onClick={dig}>
        Копать
      </button>
      <Item name={itemName} />
      <Inventory {...count} />
    </div>
  );
};

export default Clicker;
