import LottoMachine from "./domain/LottoMachine.js";

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

purchaseButton.addEventListener("click", () => {
  lottoStart();
  resultSection.style.display = "block";
  winningSection.style.display = "block";
});

resultButton.addEventListener("click", () => {
  checkStart();
  modal.style.display = "block"; // 모달창 보이기

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

const lottoStart = () => {
  // 구입 금액 입력 도메인 연결
  const value = document.querySelector(".purchase_input").value;
  const { count, lottoPack } = LottoMachine(value);
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
};

const checkStart = () => {
  // 당첨 번호 도메인 연결
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  const winningNumbers = [...winningNumberInputs].map((winningNumber) => {
    return Number(winningNumber.value);
  });
  const bonusNumberInput = Number(document.querySelector(".bonus_number_input").value);
};
