import { playLotto } from "../../step2-index.js";
import LottoMachine from "../../domain/LottoMachine.js";
import validatePurchaseAmount from "../../domain/validation/validatePurchaseAmount.js";

const resultSection = document.querySelector(".result_section");
const winningSection = document.querySelector(".winning_number_section");

export const randomLottos = () => {
  const { purchaseAmount, lottoPack } = lottoStart();
  resultSection.style.display = "block";
  winningSection.style.display = "block";
  playLotto(purchaseAmount, lottoPack);
};

const lottoStart = () => {
  try {
    // 구입 금액 입력 도메인 연결
    const purchaseAmount = document.querySelector(".purchase_input").value;
    validatePurchaseAmount(purchaseAmount);

    const { count, lottoPack } = LottoMachine(purchaseAmount);
    const resultText = document.querySelector(".result_text");
    resultText.textContent = `총 ${count}개를 구매하였습니다.`;

    // 랜덤 로또 번호 출력 도메인 연결
    const lottoPackContainer = document.querySelector(".lotto_pack");
    lottoPackContainer.innerHTML = "";
    lottoPack.lottos.forEach((lotto) => {
      const lottoElement = document.createElement("div");
      lottoElement.classList.add("lotto");
      lottoElement.innerHTML = `
        <img src="./public/ticket.png" />
        <p class="random_number">${lotto.lottoNumbers.join(", ")}</p>
      `;
      lottoPackContainer.appendChild(lottoElement);
    });
    return { purchaseAmount, lottoPack };
  } catch (error) {
    window.alert(error.message);
    document.querySelector(".purchase_input").value = "";
  }
};
