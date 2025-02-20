import { BONUS, WINNING } from "../constants/constant.js";

const compareMachine = (lottoPack, answerLottoPack) => {
  const result = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };

  lottoPack.lottos.forEach((lotto) => {
    let winningCount = 0;
    let bonusCount = 0;
    lotto.lottoNumbers.forEach((number) => {
      if (answerLottoPack.answerTable[number] === WINNING) {
        winningCount += 1;
      }
      if (answerLottoPack.answerTable[number] === BONUS) {
        bonusCount += 1;
      }
    });
    if (winningCount >= 3) {
      if (winningCount === 5 && bonusCount === 1) {
        result["5+1"]++;
      } else {
        result[winningCount]++;
      }
    }
  });
  return result;
};

export default compareMachine;
