import GameModel from "@/models/GameModel";
import GameView from "@/views/GameView";

const Bottombar = (): Element => {
  const gameModel = GameModel.instance;
  const gameView = GameView.instance;

  // Tạo thẻ div với lớp "bottombar"
  let bottombarDiv = document.createElement("div");
  bottombarDiv.className = "bottombar";

  let resetButton = document.createElement("div");
  resetButton.className = "btn";
  resetButton.innerHTML = '<ion-icon name="refresh-outline"></ion-icon>';

  let nextButton = document.createElement("div");
  nextButton.className = "btn";
  nextButton.innerHTML = '<ion-icon name="play-forward-outline"></ion-icon>';

  let prevButton = document.createElement("div");
  prevButton.className = "btn";
  prevButton.innerHTML = '<ion-icon name="play-back-outline"></ion-icon>';

  let logoutlButton = document.createElement("div");
  logoutlButton.className = "btn";
  logoutlButton.innerHTML = '<ion-icon name="log-out-outline"></ion-icon>';

  bottombarDiv.append(resetButton, prevButton, nextButton, logoutlButton);

  // Sự kiện
  resetButton.addEventListener("click", (): void => {
    const listCard: Element[] = Array.from(document.querySelectorAll(".card"));

    const gameLayout = document.querySelector(".game-layout") as HTMLElement;

    gameLayout.remove();
    gameModel.reset(listCard);
    gameModel.setlist(gameModel.list);
    gameView.render(gameModel);
  });

  logoutlButton.addEventListener("click", (): void => {
    gameModel.cancel();
  });

  return bottombarDiv;
};

export default Bottombar;
