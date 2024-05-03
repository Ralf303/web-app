const tg = window.Telegram.WebApp;

const useTelegram = () => {
  return {
    user: tg.initDataUnsafe?.user,
    tg,
  };
};

export default useTelegram;
