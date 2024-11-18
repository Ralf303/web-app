import React, { useEffect, useState } from "react";
import useTelegram from "../hooks/telegram-hook";
import "../styles/main.css";
import "../styles/home.css";
import UserApi from "../services/api-service";
import HomeItem from "../components/home/home";
import Modal from "../components/modal/modal";
import StatusModal from "../components/modal/dialog";
import axios from "axios";

function Home() {
  const tg = useTelegram();
  const { first_name = "test", id = "1157591765" } = tg?.user || {};
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchHomeById = async (homeId: number) => {
    try {
      const response = await UserApi.getHouseById(homeId);
      if (response) {
        //@ts-ignore
        setHomes((prevHomes) => {
          //@ts-ignore
          if (!prevHomes.some((home) => home.id === response.id)) {
            return [...prevHomes, response];
          }
          return prevHomes;
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAllHomes = async () => {
    const { data } = await axios.get("https://pablohouse.su:88/homeCount");

    for (let i = 1; i <= data; i++) {
      await fetchHomeById(i);
    }
  };

  useEffect(() => {
    fetchAllHomes();
  }, [id]);

  const handleBuyClick = (home: any) => {
    setSelectedHome(home);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedHome) {
      const res = await UserApi.buyHouse(
        selectedHome.id,
        id,
        selectedHome.price
      );

      switch (res) {
        case "success":
          setStatusMessage("Поздравляем с успешной покупкой дома!");
          setHomes([]); // Сбрасываем список домов перед перезагрузкой
          await fetchAllHomes(); // Обновить список домов после успешной покупки
          break;
        case "money":
          setStatusMessage("У тебя не хватает денег на покупку этого дома.");
          break;
        case "home":
          setStatusMessage("Этот дом уже занят.");
          break;
        case "meHome":
          setStatusMessage("Ты можешь владеть только одним домом.");
          break;
        default:
          break;
      }
      setIsStatusModalOpen(true);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleStatusClose = () => {
    setIsStatusModalOpen(false);
  };

  return (
    <div>
      <div className="home">
        <div className="home__container">
          <div className="home__content">
            {homes.map((home: any) => (
              <HomeItem
                key={home.id}
                title={`${home.id}. ${home.name}`}
                owner={
                  home.user ? `Владалец - ${home.user.firstname}` : "Свободен"
                }
                imgSrc={`data:image/png;base64,${home.imgSrc}`}
                isAvailable={home.userId ? false : true}
                price={home.price}
                onBuyClick={() => handleBuyClick(home)}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={selectedHome?.name || ""}
        price={selectedHome?.price || 0}
      />
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={handleStatusClose}
        message={statusMessage}
      />
    </div>
  );
}

export default Home;
