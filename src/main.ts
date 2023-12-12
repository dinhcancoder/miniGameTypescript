import "./css/style.css";
import GameModel from "./models/GameModel";
import GameView from "./views/GameView";
import GameUser from "./views/GameUser";

const initGame = (): void => {
  const gameModel = GameModel.instance;
  const gameView = GameView.instance;
  const gameUser = GameUser.instance;

  const user = localStorage.getItem("user");

  if (user) {
    gameView.render(gameModel);
  } else {
    gameUser.render();
  }
};

document.addEventListener("DOMContentLoaded", initGame);
