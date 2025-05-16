import React, { useState, useRef } from "react";
import "../styles/roulette.css";
//@ts-ignore
import iphone from "../img/prizes/iPhone.png";
//@ts-ignore
import supreme from "../img/prizes/supreme_bag.png";
//@ts-ignore
import dunk from "../img/prizes/dunk_low.png";
//@ts-ignore
import keyboard from "../img/prizes/keyboard.png";
//@ts-ignore
import headphones from "../img/prizes/headphones.png";
//@ts-ignore
import pointer from "../img/prizes/pointer.png";
const cells = 31;

const items = [
  { name: "Айфон", img: iphone, chance: 100 },
  { name: "Сумка", img: supreme, chance: 200 },
  { name: "Кроссовки", img: dunk, chance: 300 },
  { name: "Клавиатура", img: keyboard, chance: 400 },
  { name: "Наушники", img: headphones, chance: 600 },
];

const getItem = () => {
  let item: any;
  while (!item) {
    const chance = Math.floor(Math.random() * 600);
    items.forEach((elm) => {
      if (chance < elm.chance && !item) item = elm;
    });
  }
  return item;
};

const generateItems = () => {
  const generatedItems: any = [];
  for (let i = 0; i < cells; i++) {
    const item = getItem();
    generatedItems.push(item);
  }
  return generatedItems;
};

const Roulette: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [rouletteItems, setRouletteItems] = useState(generateItems());
  const [message, setMessage] = useState("Рулетка");
  const [isFirstStart, setFirstStart] = useState(true);
  const rouletteRef = useRef<HTMLUListElement>(null);

  const startRoulette = () => {
    if (isStarted) return;
    setIsStarted(true);

    if (!isFirstStart) setRouletteItems(generateItems());
    else setFirstStart(false);
    console.log("ЗАПУСК");

    const items = rouletteRef.current!.querySelectorAll("li");
    items.forEach((item) => {
      item.classList.remove("active");
    });

    if (rouletteRef.current) {
      console.log("ЗАШЛИ В УСЛОВИЕ");
      setTimeout(() => {
        rouletteRef.current!.style.left = "50%";
        rouletteRef.current!.style.transform = "translate3d(-50%, 0, 0)";
        setMessage("Удачи...");
      }, 0);

      const item = items[15];

      console.log("ЖДЕМ");

      rouletteRef.current.addEventListener(
        "transitionend",
        () => {
          console.log("ОТРАБОТАЛ ИВЕНТ");
          setIsStarted(false);
          item.classList.add("active");
          const data = JSON.parse(item.getAttribute("data-item")!);
          setMessage(`Выпало: ${data.name}`);
          console.log(data);
        },
        { once: true }
      );
    }
  };

  return (
    <div className="roulette">
      <p className="message">{message}</p>
      <img className="pointer" src={pointer} alt="pointer" />
      <div className="scope">
        <ul className="list" ref={rouletteRef}>
          {rouletteItems.map((item: any, index: any) => (
            <li
              key={index}
              className="list__item"
              data-item={JSON.stringify(item)}
            >
              <img src={item.img} alt={item.name} />
            </li>
          ))}
        </ul>
      </div>
      <button className="start" onClick={startRoulette}>
        Крутить
      </button>
    </div>
  );
};

export default Roulette;
