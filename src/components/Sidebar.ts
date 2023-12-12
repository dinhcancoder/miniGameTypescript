import GameModel from "@/models/GameModel";
import GameView from "@/views/GameView";

const Sidebar = (): Element => {
  const gameModel = GameModel.instance;
  const gameView = GameView.instance;

  let sidebarDiv = document.createElement("div");
  sidebarDiv.className = "sidebar";

  const point = document.createElement("div");
  point.className = "point";
  point.textContent = "0";

  const username = document.createElement("div");
  username.className = "username";
  username.textContent = `Tên người chơi: ${localStorage.getItem("user")}`;

  const level = document.createElement("div");
  level.className = "username";
  level.textContent = `Cấp độ: ${localStorage.getItem("level")}`;

  sidebarDiv.append(point, username, level);

  return sidebarDiv;
};

export default Sidebar;
