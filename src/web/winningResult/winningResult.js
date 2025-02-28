import validateWinningNumbers from "../../domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "../../domain/validation/validateBonusNumber.js";
import generateAnswerLotto from "../../domain/AnswerLottoPack.js";
import profitCalculator from "../../domain/profitCalculator.js";

export const winningResult = (purchaseAmount, lottoPack) => {
  try {
    // 당첨 번호 도메인 연결
    const modal = document.querySelector(".modal_overlay");
    const winningNumberInputs = document.querySelectorAll(".winning_number_input");
    const winningNumbers = [...winningNumberInputs].map((winningNumber) => {
      return Number(winningNumber.value);
    });
    validateWinningNumbers(winningNumbers.join(","));
    const bonusNumberInput = Number(document.querySelector(".bonus_number_input").value);
    validateBonusNumber(winningNumbers)(bonusNumberInput);
    modal.style.display = "block"; // 모달창 보이기
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumberInput);
    const winningResult = lottoPack.playCompare(answerLotto);
    const matchCountFifth = document.getElementById("match_3");
    const matchCountForth = document.getElementById("match_4");
    const matchCountThird = document.getElementById("match_5");
    const matchCountSecond = document.getElementById("match_5+1");
    const matchCountFirst = document.getElementById("match_6");
    matchCountFifth.textContent = `${winningResult[3]}개`;
    matchCountForth.textContent = `${winningResult[4]}개`;
    matchCountThird.textContent = `${winningResult[5]}개`;
    matchCountSecond.textContent = `${winningResult["5+1"]}개`;
    matchCountFirst.textContent = `${winningResult[6]}개`;
    const profitRate = profitCalculator(purchaseAmount, winningResult);
    const profitResult = document.querySelector(".profit");
    profitResult.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  } catch (error) {
    [...document.querySelectorAll(".winning_number_input")].map((winningNumber) => {
      winningNumber.value = "";
    });
    document.querySelector(".bonus_number_input").value = "";
    window.alert(error.message);
  }
};
