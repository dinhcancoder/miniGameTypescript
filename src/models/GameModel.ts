import DB from "@/api/list";

interface List {
  choose(id: number, node: Element): void;
  reset(nodeList: any): void;
  shuffle(arr: any[]): any[];
  point(arr: number[]): void;
  level(num: number): any[];
  // win(): void;
  cancel(): void;
}

export default class GameModel implements List {
  static instance: GameModel = new GameModel();
  private flippedArr: number[] = [];
  private flippedNode: Element[] = [];
  private isProcessing: boolean = false;
  private arrPoint: number[] = [];

  private constructor(private _list: any[] = DB) {}

  get list(): any[] {
    return this.shuffle(this._list);
  }

  setlist(arr: any[]) {
    this._list = arr;
  }

  choose(id: number, card: Element): void {
    if (this.isProcessing) return;

    this.flippedArr.push(id);
    this.flippedNode.push(card);
    card.classList.add("active");

    if (this.flippedArr.length === 2) {
      const [id1, id2] = this.flippedArr;
      const [card1, card2] = this.flippedNode;
      this.isProcessing = true;

      if (id1 !== id2) {
        setTimeout(() => {
          card1.classList.remove("active");
          card2.classList.remove("active");
          this.isProcessing = false;
        }, 620);
      } else {
        this.arrPoint.push(this._list[id1]["coin"]);
        this.point(this.arrPoint);

        const body = document.body as Element;
        body.className = "correctly";

        setTimeout(() => {
          body.className = "";
          this.isProcessing = false;
        }, 1200);
      }

      setTimeout(() => {
        this.flippedArr = [];
        this.flippedNode = [];
      }, 620);
    }
  }

  reset(listCartd: Element[]): void {
    listCartd.forEach((card) => card.classList.remove("active"));
  }

  shuffle(arr: any[]): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  point(arrPoint: number[]): void {
    let point = 0;

    arrPoint.forEach((pointEl) => (point += pointEl));

    const pointEl = document.querySelector(".point") as HTMLElement;
    pointEl.innerText = `${point}`;
  }

  level(num: number): any[] {
    let newArr: any = [];

    num > 5 ? (num = 5) : num;

    for (let i = 0; i < num * 2; i++) {
      newArr.push(this._list[i]);
    }

    return [...newArr, ...newArr];
  }

  cancel(): void {
    localStorage.clear();
    window.location.href = "";
  }
}
