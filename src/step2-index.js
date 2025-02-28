import generateAnswerLotto from "./domain/AnswerLottoPack.js";
import profitCalculator from "./domain/profitCalculator.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";
import { randomLottos } from "./web/randomLottos/randomLottos.js";
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const resultButton = document.querySelector(".result_check_button");
const modal = document.querySelector(".modal_overlay");
const closeButton = document.querySelector(".close_button");
const purchaseButton = document.querySelector(".purchase_button");
const resultSection = document.querySelector(".result_section");
const winningSection = document.querySelector(".winning_number_section");
const restartButton = document.querySelector(".restart");

document.addEventListener("DOMContentLoaded", () => {
  purchaseButton.addEventListener("click", randomLottos);
});

export const playLotto = (purchaseAmount, lottoPack) => {
  resultButton.addEventListener("click", () => {
    checkStart(purchaseAmount, lottoPack);
  });
  restartButton.addEventListener("click", restart);
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
};

const checkStart = (purchaseAmount, lottoPack) => {
  try {
    // 당첨 번호 도메인 연결
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

const restart = () => {
  document.querySelector(".purchase_input").value = "";
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  [...winningNumberInputs].map((winningNumber) => {
    return (winningNumber.value = "");
  });
  document.querySelector(".bonus_number_input").value = "";
  modal.style.display = "none";
  resultSection.style.display = "none";
  winningSection.style.display = "none";
};
