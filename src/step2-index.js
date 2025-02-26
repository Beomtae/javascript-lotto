/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const resultButton = document.querySelector(".result_check_button");
const modal = document.querySelector(".modal_overlay");

resultButton.addEventListener("click", () => {
  modal.style.display = "block"; // 모달창 보이기
});
