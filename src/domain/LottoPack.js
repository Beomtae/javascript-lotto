import { BONUS_CONDITION_COUNT, BONUS_MATCH, BONUS_PRIZE_KEY, MIN_WINNING_COUNT } from "../constants/constant.js";
import Lotto from "./Lotto.js";
class LottoPack {
  #lottos;
  constructor(lottos) {
    this.#lottos = lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    });
  }

  playCompare(answerLotto) {
    const result = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };

    this.#lottos.forEach((lotto) => {
      const { winningCount, bonusCount } = lotto.compareWinningNumbers(answerLotto);
      if (winningCount < MIN_WINNING_COUNT) return;

      const key = winningCount === BONUS_CONDITION_COUNT && bonusCount === BONUS_MATCH ? BONUS_PRIZE_KEY : winningCount;

      result[key] += 1;
    });
    return result;
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoPack;
