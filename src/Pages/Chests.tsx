import React, { useEffect, useState } from "react";
import Chest from "../components/chest/chest-component";
import "../styles/chests.css";
//@ts-ignore
import Chest1 from "../img/Chest_1.png";
//@ts-ignore
import Chest2 from "../img/Chest_2.png";
//@ts-ignore
import Chest3 from "../img/Chest_3.png";
//@ts-ignore
import Chest4 from "../img/Chest_4.png";
import apiService from "services/api-service";
import useTelegram from "hooks/telegram-hook";

const prizes = ["мефа", "гемов", "Ничего"];

const ChestPage: React.FC = () => {
  const tg = useTelegram();
  const { id } = tg.user;
  const [keys, setKeys] = useState<number>(2);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const [chestSrc, setChestSrc] = useState<string[]>([Chest1, Chest1, Chest1]);
  const [buttonText, setButtonText] = useState<string>(
    "Выбери один из сундуков"
  );

  useEffect(() => {
    const fetchBalance = async () => {
      const { Chests } = await apiService.get(id);
      setKeys(Chests);
    };
    fetchBalance();
  }, [id]);

  const handleChestClick = async (chestNumber: number) => {
    if (selectedChest === null && keys > 0) {
      setSelectedChest(chestNumber);
      const newChestSrc = [...chestSrc];
      const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      const user = await apiService.get(id);
      const randomNumber = randomInt(0, 2);
      if (randomNumber === 0) {
        newChestSrc[chestNumber - 1] = Chest3;
        const randomMef: number = randomInt(100, 10000);
        setSelectedPrize(`${randomMef} ${prizes[randomNumber]}`);
        await apiService.updateBalance(id, user.Balance + randomMef);
      } else if (randomNumber === 1) {
        newChestSrc[chestNumber - 1] = Chest4;
        const randomGem: number = randomInt(1, 10);
        setSelectedPrize(`${randomGem} ${prizes[randomNumber]}`);
        await apiService.updateGems(id, user.Gems + randomGem);
      } else {
        newChestSrc[chestNumber - 1] = Chest2;
        setSelectedPrize(`${prizes[randomNumber]}`);
      }

      setChestSrc(newChestSrc);
      setKeys(keys - 1);
      apiService.updateKeys(id, keys - 1);
      setButtonText("Еще раз!");
    } else if (keys === 0) {
      setButtonText("У тебя закончились ключи😢");
    }
  };

  const refreshChests = () => {
    if (selectedChest !== null && keys > 0) {
      setChestSrc([Chest1, Chest1, Chest1]);
      setSelectedChest(null);
      setSelectedPrize(null);
      setButtonText("УДАЧИ!");
    } else if (keys === 0) {
      setButtonText("У тебя закончились ключи😢");
    }
  };

  return (
    <div>
      <h1 className="title">Тайник сокровищ</h1>
      <div className="chests">
        <Chest
          src={chestSrc[0]}
          chestNumber={1}
          onSelect={handleChestClick}
          isDisabled={selectedChest !== null}
        />
        <Chest
          src={chestSrc[1]}
          chestNumber={2}
          onSelect={handleChestClick}
          isDisabled={selectedChest !== null}
        />
        <Chest
          src={chestSrc[2]}
          chestNumber={3}
          onSelect={handleChestClick}
          isDisabled={selectedChest !== null}
        />
      </div>

      <div className="button">
        <button
          className="start"
          onClick={refreshChests}
          disabled={selectedChest === null}
        >
          {buttonText}
        </button>
      </div>

      <div className="info">
        {selectedPrize !== null && <p>{`Ты получил: ${selectedPrize}`}</p>}
        <p>{`${keys} Ключей🔑`}</p>
      </div>
    </div>
  );
};

export default ChestPage;
