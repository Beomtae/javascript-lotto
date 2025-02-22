import { BONUS_CONDITION_COUNT, BONUS_MATCH, BONUS_PRIZE_KEY, MIN_WINNING_COUNT } from "../constants/constant.js";
import Lotto from "./Lotto.js";
class LottoPack {
  #lottos;
  #checkCountResult = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };
  constructor(lottos) {
    this.#lottos = lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    });
  }

  playCompare(answerLotto) {
    this.#lottos.forEach((lotto) => {
      const { winningCount, bonusCount } = lotto.compareWinningNumbers(answerLotto);
      this.#saveCheckCount(winningCount, bonusCount);
    });
    return this.#checkCountResult;
  }

  #saveCheckCount(winningCount, bonusCount) {
    if (winningCount === BONUS_CONDITION_COUNT && bonusCount === BONUS_MATCH) {
      this.#checkCountResult[BONUS_PRIZE_KEY]++;
    } else if (winningCount >= MIN_WINNING_COUNT) {
      this.#checkCountResult[winningCount]++;
    }
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoPack;
