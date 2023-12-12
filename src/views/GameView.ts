import GameModel from "@/models/GameModel";
import Sidebar from "@/components/Sidebar";
import Bottombar from "@/components/BottomBar";

interface DOMGame {
  render(gameModel: GameModel): void;
}

export default class GameView implements DOMGame {
  static instance: GameView = new GameView();

  app: HTMLUListElement;
  level: number;

  private constructor() {
    this.app = document.getElementById("app") as HTMLUListElement;
    this.level = localStorage.getItem("level")
      ? parseInt(localStorage.getItem("level")!)
      : 1;
  }

  render(gameModel: GameModel): void {
    localStorage.setItem("level", `${this.level}`);
    const gameDiv: HTMLDivElement = document.createElement("div");
    gameDiv.classList.add("game");

    const containerDiv: HTMLDivElement = document.createElement("div");
    containerDiv.classList.add("container");

    const gameLayoutDiv: HTMLDivElement = document.createElement("div");
    gameLayoutDiv.classList.add("game-layout");

    const toast: HTMLDivElement = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = "Chúc mừng bạn đã chọn chính xác";

    gameModel.level(this.level).forEach((el) => {
      const cardDiv: HTMLDivElement = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.setAttribute("data-id", el.id);

      const frontDiv: HTMLDivElement = document.createElement("div");
      frontDiv.classList.add("face", "front");

      const imgFront: HTMLImageElement = document.createElement("img");
      imgFront.setAttribute(
        "src",
        "https://meccha-japan.com/341311-large_default/badge-master-ball-pokemon.jpg"
      );
      imgFront.setAttribute("alt", "");

      const backDiv: HTMLDivElement = document.createElement("div");
      backDiv.classList.add("face", "back");

      const imgBack: HTMLImageElement = document.createElement("img");
      imgBack.setAttribute("src", `${el.image}`);
      imgBack.setAttribute("alt", "");

      frontDiv.appendChild(imgFront);
      backDiv.appendChild(imgBack);
      cardDiv.append(frontDiv, backDiv);
      gameLayoutDiv.appendChild(cardDiv);
      containerDiv.appendChild(gameLayoutDiv);
      gameDiv.appendChild(containerDiv);

      this.app.append(gameDiv, toast);

      cardDiv.addEventListener("click", (): void => {
        gameModel.choose(el.id, cardDiv);
      });
    });

    gameDiv.append(Sidebar(), Bottombar());
    const btn = document.querySelectorAll(".btn");
    btn[2].addEventListener("click", () => {
      this.level++;
      if (this.level > 5) return (this.level = 5);
      gameDiv.remove();
      this.render(gameModel);
    });

    btn[1].addEventListener("click", () => {
      this.level--;
      if (this.level < 1) return (this.level = 1);
      gameDiv.remove();
      this.render(gameModel);
    });
  }
}
