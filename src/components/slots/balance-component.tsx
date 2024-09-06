import React from "react";

interface BalanceProps {
  balance: string;
  bet: number;
  decreaseBalance: () => void;
  placeBet: () => void;
  multiplyBet: () => void;
}

function Balance(props: BalanceProps) {
  return (
    <section id="balance">
      Ставка: {props.bet}
      <br />
      Баланс: {props.balance}
      <br />
      <button className="bet-button" onClick={props.decreaseBalance}>
        x0.5
      </button>
      <button className="bet-button" onClick={props.placeBet}>
        Place All
      </button>
      <button className="bet-button" onClick={props.multiplyBet}>
        x2
      </button>
    </section>
  );
}

export default Balance;
