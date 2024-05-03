export default new (class DigService {
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  dig() {
    const chance: number = this.getRandomInt(0, 100);
    if (chance < 10) {
      return { item: "Золото", itemName: "gold" };
    } else if (chance < 40) {
      return { item: "Железо", itemName: "iron" };
    } else {
      return { item: "Камень", itemName: "stone" };
    }
  }
})();
