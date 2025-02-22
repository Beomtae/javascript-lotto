import { BONUS, WINNING } from "../src/constants/constant.js";
import Lotto from "../src/domain/Lotto.js";
import purchaseLottoCount from "../src/domain/purchaseLottoCount.js";

test("로또의 1장 가격은 1000원이다.", () => {
  const money = 1000;

  expect(purchaseLottoCount(money)).toBe(1);
});

describe("로또 도메인 테스트", () => {
  const lottoNumber = [1, 2, 3, 4, 5, 6];
  const reverseLottoNumber = [6, 5, 4, 3, 2, 1];

  test("로또 번호는 6자리이다.", () => {
    const lotto = new Lotto(lottoNumber);
    expect(lotto.lottoNumbers.length).toBe(6);
  });

  test("로또 번호는 오름차순으로 정렬된다.", () => {
    const lotto = new Lotto(reverseLottoNumber);
    expect(lotto.lottoNumbers).toEqual(lottoNumber);
  });
  test("당첨 번호 6개가 모두 일치하면 winningCount는 6, bonusCount는 0", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const answerLotto = { 1: WINNING, 2: WINNING, 3: WINNING, 4: WINNING, 5: WINNING, 6: WINNING };

    const result = lotto.compareWinningNumbers(answerLotto);

    expect(result).toEqual({ winningCount: 6, bonusCount: 0 });
  });
  test("5개의 숫자가 당첨되고 1개가 보너스 번호인 경우", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]); // 7번이 보너스 번호
    const answerLotto = { 1: WINNING, 2: WINNING, 3: WINNING, 4: WINNING, 5: WINNING, 7: BONUS };

    const result = lotto.compareWinningNumbers(answerLotto);

    expect(result).toEqual({ winningCount: 5, bonusCount: 1 });
  });
});
