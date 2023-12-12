interface DOMGame {
  render(): void;
}

export default class GameUser implements DOMGame {
  static instance: GameUser = new GameUser();

  app: HTMLUListElement;

  private constructor() {
    this.app = document.getElementById("app") as HTMLUListElement;
  }

  render(): void {
    const layout = `
    <div class="form">
      <div class="form-group">
        <label class="form-name">Tên người chơi</label>
        <input type="text" class="form-input" placeholder="Ex: Monkey D Luffy"/>
        <span class="form-error"></span>
      </div>
      <button class="form-submit">Vào game</button>
    </div>
    `;

    this.app.insertAdjacentHTML("beforebegin", layout);

    const btn = document.querySelector(".form-submit") as HTMLButtonElement;
    const inputEl = document.querySelector(".form-input") as HTMLInputElement;
    const errorEl = inputEl.nextElementSibling as HTMLSpanElement;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    inputEl.addEventListener("keyup", () => {
      errorEl.textContent = "";
    });

    btn.addEventListener("click", () => {
      if (inputEl.value !== "") {
        if (specialCharacterRegex.test(inputEl.value)) {
          errorEl.textContent =
            "Tên người chơi không được chứa kí tự đặc biệt!";
        } else if (inputEl.value.length <= 2) {
          errorEl.textContent = "Tên người chơi quá ngắn!";
        } else {
          localStorage.setItem("user", inputEl.value);
          window.location.href = "";
        }
      } else {
        errorEl.textContent = "Tên người chơi không được để trống!";
      }
    });
  }
}
