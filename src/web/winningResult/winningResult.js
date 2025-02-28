import validateWinningNumbers from "../../domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "../../domain/validation/validateBonusNumber.js";
import generateAnswerLotto from "../../domain/AnswerLottoPack.js";
import profitCalculator from "../../domain/profitCalculator.js";

export const winningResult = (purchaseAmount, lottoPack) => {
  try {
    const { winningNumbers, bonusNumberInput } = validateInputs();
    // 당첨 번호 도메인 연결
    const modal = document.querySelector(".modal_overlay");

    modal.style.display = "block"; // 모달창 보이기
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumberInput);
    const winningResult = lottoPack.playCompare(answerLotto);
    updateResultUI(winningResult);
    updateProfitUI(purchaseAmount, winningResult);
  } catch (error) {
    resetInputs();
    window.alert(error.message);
  }
};

const validateInputs = () => {
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  const winningNumbers = [...winningNumberInputs].map((winningNumber) => {
    return Number(winningNumber.value);
  });
  validateWinningNumbers(winningNumbers.join(","));
  const bonusNumberInput = Number(document.querySelector(".bonus_number_input").value);
  validateBonusNumber(winningNumbers)(bonusNumberInput);
  return { winningNumbers, bonusNumberInput };
};

const resetInputs = () => {
  [...document.querySelectorAll(".winning_number_input")].map((winningNumber) => {
    winningNumber.value = "";
  });
  document.querySelector(".bonus_number_input").value = "";
};

const updateResultUI = (winningResult) => {
  const matchCountElements = {
    3: document.getElementById("match_3"),
    4: document.getElementById("match_4"),
    5: document.getElementById("match_5"),
    "5+1": document.getElementById("match_5+1"),
    6: document.getElementById("match_6"),
  };
  Object.entries(matchCountElements).forEach(([key, element]) => {
    element.textContent = `${winningResult[key]}개`;
  });
};

const updateProfitUI = (purchaseAmount, winningResult) => {
  const profitRate = profitCalculator(purchaseAmount, winningResult);
  const profitResult = document.querySelector(".profit");
  profitResult.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
};
