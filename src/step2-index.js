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

resultButton.addEventListener("click", () => {
  modal.style.display = "block"; // 모달창 보이기
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

purchaseButton.addEventListener("click", () => {
  lottoStart();
  resultSection.style.display = "block";
  winningSection.style.display = "block";
});

const lottoStart = () => {
  const value = document.querySelector(".purchase_input").value;
  const { count, lottoPack } = LottoMachine(value);
  console.log(count, lottoPack);
  const resultText = document.querySelector(".result_text");
  resultText.textContent = `총 ${count}개를 구매하였습니다.`;
  // 랜덤 로또값 생성 화면
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
