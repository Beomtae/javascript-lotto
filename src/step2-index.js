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
  resultSection.style.display = "block";
  winningSection.style.display = "block";
});
