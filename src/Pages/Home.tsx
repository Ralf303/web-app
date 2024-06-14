import React, { useEffect, useState } from "react";
import useTelegram from "../hooks/telegram-hook";
import "../styles/home.css";
import Img from "components/image/img-component";
import UserApi from "../services/api-service";

function Home() {
  const tg = useTelegram();
  const { first_name, id } = tg.user;
  const [balance, setBalance] = useState<number>(0);
  const [gems, setGems] = useState<number>(0);
  const [keys, setKeys] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const { Balance, Gems, Chests } = await UserApi.get(id);
      setBalance(Balance);
      setGems(Gems);
      setKeys(Chests);
    };

    fetchBalance();
  }, [id]);

  return (
    <div>
      <h2 className="home-h2">Добро пожаловать, {first_name}!</h2>
      <Img
        src={`https://mefadmin.ru:88/getPhoto?userId=${id}`}
        alt="твой пабло"
      />
      <ul className="home-ul">
        <li className="home-li">{first_name}</li>
        <li className="home-li">{balance} старок🌿</li>
        <li className="home-li">{gems} гемов💎</li>
        <li className="home-li">{keys} ключей🔑</li>
      </ul>
    </div>
  );
}

export default Home;
