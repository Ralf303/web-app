import React from "react";
import Count from "../../types/clickerTypes";

const Inventory = (inventory: Count) => {
  return (
    <div id="inventory">
      <p>Инвентарь</p>
      <ul>
        <li>
          Камень - <span id="stone">{inventory.stone}</span>
        </li>
        <li>
          Железо - <span id="iron">{inventory.iron}</span>
        </li>
        <li>
          Золото - <span id="gold">{inventory.gold}</span>
        </li>
      </ul>
    </div>
  );
};

export default Inventory;
