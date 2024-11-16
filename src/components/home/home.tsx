import React from "react";
import { separateNumber } from "utils/helpers";

interface HomeItemProps {
  title: string;
  owner: string;
  imgSrc: string;
  isAvailable: boolean;
  price?: number;
  onBuyClick: () => void;
}

const HomeItem: React.FC<HomeItemProps> = ({
  title,
  owner,
  imgSrc,
  isAvailable,
  price,
  onBuyClick,
}) => {
  return (
    <div className="home__item">
      <h3 className="home__title">{title}</h3>
      <h3 className="home__owner">{owner}</h3>
      <img src={imgSrc} className="home__img" alt={title} />
      {isAvailable ? (
        <button className="home__button__available" onClick={onBuyClick}>
          Купить за {separateNumber(price!)} мефа
        </button>
      ) : (
        <button className="home__button" disabled>
          Не доступен
        </button>
      )}
    </div>
  );
};

export default HomeItem;
