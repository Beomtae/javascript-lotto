import { BONUS, WINNING } from "../constants/constant.js";

class Lotto {
  #lottoNumbers;
  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  #ascendingSort(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  compareWinningNumbers(answerLotto) {
    const winningCount = this.#lottoNumbers.filter((number) => answerLotto[number] === WINNING).length;
    const bonusCount = this.#lottoNumbers.filter((number) => answerLotto[number] === BONUS).length;
    return { winningCount, bonusCount };
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
