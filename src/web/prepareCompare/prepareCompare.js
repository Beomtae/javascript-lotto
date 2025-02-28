import LottoMachine from "../../domain/LottoMachine.js";
import validatePurchaseAmount from "../../domain/validation/validatePurchaseAmount.js";

const resultSection = document.querySelector(".result_section");
const winningSection = document.querySelector(".winning_number_section");

export const prepareCompare = () => {
  try {
    const purchaseAmount = document.querySelector(".purchase_input").value;
    validatePurchaseAmount(purchaseAmount);

    const { count, lottoPack } = LottoMachine(purchaseAmount);

    updatePurchaseUI(count);
    updateRandomLottoUI(lottoPack);

    resultSection.style.display = "block";
    winningSection.style.display = "block";
    return { purchaseAmount, lottoPack };
  } catch (error) {
    window.alert(error.message);
    document.querySelector(".purchase_input").value = "";
  }
};

const updatePurchaseUI = (count) => {
  document.querySelector(".result_text").textContent = `총 ${count}개를 구매하였습니다.`;
};

const updateRandomLottoUI = (lottoPack) => {
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
};
