import React, { useState, useEffect } from "react";
import Balance from "components/slots/balance-component";
import SpinButton from "components/slots/button-component";
import Options from "components/slots/option-component";
import Status from "components/slots/slot-status-component";
import Slots from "components/slots/slots-component";
import "../styles/slot.css";
//@ts-ignore
import spinAudio from "../res/sounds/spin.mp3";
//@ts-ignore
import coinAudio from "../res/sounds/coin.mp3";
//@ts-ignore
import winAudio from "../res/sounds/win.mp3";
//@ts-ignore
import loseAudio from "../res/sounds/lose.mp3";
//@ts-ignore
import cherries from "../res/tiles/cherries.png";
//@ts-ignore
import club from "../res/tiles/club.png";
//@ts-ignore
import diamond from "../res/tiles/diamond.png";
//@ts-ignore
import heart from "../res/tiles/heart.png";
//@ts-ignore
import spade from "../res/tiles/spade.png";
//@ts-ignore
import joker from "../res/tiles/joker.png";
//@ts-ignore
import seven from "../res/tiles/seven.png";
import useTelegram from "hooks/telegram-hook";
import apiService from "../services/api-service";
import { separateNumber } from "utils/helpers";

const spin = new Array(7).fill(new Audio(spinAudio));
const coin = new Audio(coinAudio);
const coin2 = new Audio(coinAudio);
const win = new Audio(winAudio);
const lose = new Audio(loseAudio);

const SlotPage: React.FC = () => {
  const tg = useTelegram();
  const { id } = tg.user;
  const [doing, setDoing] = useState(false);
  const [audio, setAudio] = useState(true);
  const [status, setStatus] = useState("УДАЧИ!");
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(100);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const { Balance } = await apiService.get(id);
      setBalance(Balance);
    };

    fetchBalance();
  }, [id]);

  const handleOpenRules = () => {
    setShowRules(true);
  };

  const handleCloseRules = () => {
    setShowRules(false);
  };

  async function doSlot() {
    if (doing) {
      return null;
    }

    if (balance < bet) {
      setStatus("НЕДОСТАТОЧНО ДЕНЕГ!");
      return null;
    }
    console.log("БАЛАНС ДО", balance);

    setBalance(balance - bet);

    setDoing(true);
    let numChanges = randomInt(1, 4) * 7;
    let numeberSlot1 = numChanges + randomInt(1, 7);
    let numeberSlot2 = numChanges + 2 * 7 + randomInt(1, 7);
    let numeberSlot3 = numChanges + 5 * 7 + randomInt(1, 7);

    let i1 = 0;
    let i2 = 0;
    let i3 = 0;

    setStatus("ВРАЩАЕМ...");
    const slot1 = setInterval(spin1, 40);
    const slot2 = setInterval(spin2, 40);
    const slot3 = setInterval(spin3, 40);
    function spin1() {
      i1++;
      if (i1 >= numeberSlot1) {
        if (audio) coin.play();
        clearInterval(slot1);
        return null;
      }
      const slotTile = document.getElementById("slot1");

      if (slotTile) {
        if (slotTile.className === "a7") {
          slotTile.className = "a0";
        }
        slotTile.className =
          "a" + (parseInt(slotTile.className.substring(1)) + 1);
      }
    }
    function spin2() {
      i2++;
      if (i2 >= numeberSlot2) {
        if (audio) coin2.play();
        clearInterval(slot2);
        return null;
      }
      const slotTile = document.getElementById("slot2");
      if (slotTile) {
        if (slotTile.className === "a7") {
          slotTile.className = "a0";
        }
        slotTile.className =
          "a" + (parseInt(slotTile.className.substring(1)) + 1);
      }
    }
    async function spin3() {
      let sound = 0;
      i3++;
      if (i3 >= numeberSlot3) {
        clearInterval(slot3);
        await testWin();
        return null;
      }
      const slotTile = document.getElementById("slot3");
      if (slotTile) {
        if (slotTile.className === "a7") {
          slotTile.className = "a0";
        }

        slotTile.className =
          "a" + (parseInt(slotTile.className.substring(1)) + 1);
      }
      sound++;
      if (sound === spin.length) {
        sound = 0;
      }
      if (audio) spin[sound].play();
    }
  }

  const testWin = async () => {
    const slot1 = document.getElementById("slot1")?.className;
    const slot2 = document.getElementById("slot2")?.className;
    const slot3 = document.getElementById("slot3")?.className;

    let result;

    switch (true) {
      case slot1 === "a2" && slot2 === "a2" && slot3 === "a2":
        result = "х10 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 10)
        );
        setBalance(Math.trunc(balance - bet + bet * 10));
        if (audio) win.play();
        break;

      case slot1 === "a3" && slot2 === "a3" && slot3 === "a3":
        result = "х15 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 15)
        );
        setBalance(Math.trunc(balance - bet + bet * 15));
        if (audio) win.play();
        break;

      case slot1 === "a4" && slot2 === "a4" && slot3 === "a4":
        result = "х20 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 20)
        );
        setBalance(Math.trunc(balance - bet + bet * 20));
        if (audio) win.play();
        break;

      case slot1 === "a5" && slot2 === "a5" && slot3 === "a5":
        result = "х30 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 30)
        );
        setBalance(Math.trunc(balance - bet + bet * 30));
        if (audio) win.play();
        break;

      case slot1 === "a6" && slot2 === "a6" && slot3 === "a6":
        result = "х40 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 40)
        );
        setBalance(Math.trunc(balance - bet + bet * 40));
        if (audio) win.play();
        break;

      case slot1 === "a7" && slot2 === "a7" && slot3 === "a7":
        result = "х60 ПОБЕДА!";
        await apiService.updateBalance(
          id,
          Math.trunc(balance - bet + bet * 60)
        );
        setBalance(Math.trunc(balance - bet + bet * 60));
        if (audio) win.play();
        break;

      case slot1 === "a1" && slot2 === "a1" && slot3 === "a1":
        result = "х100 ДЖЕКПОТ!";
        await apiService.updateBalance(id, balance - bet + bet * 100);
        setBalance(balance - bet + bet * 100);
        if (audio) win.play();
        break;

      case slot1 === "a2" && slot2 === "a2":
      case slot3 === "a2" && slot2 === "a2":
      case slot1 === "a2" && slot3 === "a2":
        result = "х3 ПОБЕДА!";
        await apiService.updateBalance(id, Math.trunc(balance - bet + bet * 3));
        setBalance(Math.trunc(balance - bet + bet * 3));
        if (audio) win.play();
        break;

      default:
        await apiService.updateBalance(id, balance - bet);
        result = "НЕ ПОВЕЗЛО(";
        if (audio) lose.play();
        break;
    }

    setStatus(result);
    setDoing(false);
  };

  const toggleAudio = () => {
    setAudio(!audio);
  };

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const decreaseBalance = () => {
    if (bet * 0.5 >= 5) {
      setBet(Math.floor(bet * 0.5));
    }
  };

  const placeBet = () => {
    if (balance >= bet) {
      setBet(balance);
    }
  };

  const multiplyBet = () => {
    if (bet * 2 <= balance) {
      const newBet = bet * 2;
      if (newBet > 1000000) {
        setBet(1000000);
      } else {
        setBet(newBet);
      }
    }
  };

  return (
    <main>
      <div className="main">
        <Slots />
        <Status status={status} />
        <Balance
          balance={separateNumber(balance)}
          bet={bet}
          decreaseBalance={decreaseBalance}
          placeBet={placeBet}
          multiplyBet={multiplyBet}
        />
        <SpinButton doSlot={doSlot} />
        <Options toggleAudio={toggleAudio} audio={audio} />
      </div>
      <p className="rules" onClick={handleOpenRules}>
        Правила игры
      </p>
      {showRules && (
        <div id="rulesModal" className="rules-modal">
          <div className="rules-modal-content">
            <span className="close" onClick={handleCloseRules}>
              &times;
            </span>
            <h2 className="rules">Правила игры</h2>
            <table>
              <tbody className="rules">
                <tr>
                  <th className="rules">Слот</th>
                  <th className="rules">Множитель выплат</th>
                </tr>
                <tr>
                  <td className="combination">
                    <img src={cherries} alt="Вишня"></img>
                    <img src={cherries} alt="Вишня"></img>
                  </td>
                  <td>х3</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={cherries} alt="Вишня"></img>
                      <img src={cherries} alt="Вишня"></img>
                      <img src={cherries} alt="Вишня"></img>
                    </div>
                  </td>
                  <td>х10</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={club} alt="Крести"></img>
                      <img src={club} alt="Крести"></img>
                      <img src={club} alt="Крести"></img>
                    </div>
                  </td>
                  <td>х15</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={diamond} alt="Бубна"></img>
                      <img src={diamond} alt="Бубна"></img>
                      <img src={diamond} alt="Бубна"></img>
                    </div>
                  </td>
                  <td>х20</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={heart} alt="Черви"></img>
                      <img src={heart} alt="Черви"></img>
                      <img src={heart} alt="Черви"></img>
                    </div>
                  </td>
                  <td>х30</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={spade} alt="Пики"></img>
                      <img src={spade} alt="Пики"></img>
                      <img src={spade} alt="Пики"></img>
                    </div>
                  </td>
                  <td>х40</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={joker} alt="Джокер"></img>
                      <img src={joker} alt="Джокер"></img>
                      <img src={joker} alt="Джокер"></img>
                    </div>
                  </td>
                  <td>х60</td>
                </tr>
                <tr>
                  <td className="combination">
                    <div className="combination">
                      <img src={seven} alt="Семерка"></img>
                      <img src={seven} alt="Семерка"></img>
                      <img src={seven} alt="Семерка"></img>
                    </div>
                  </td>
                  <td>х100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default SlotPage;
