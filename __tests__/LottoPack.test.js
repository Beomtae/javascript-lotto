import Lotto from "../src/domain/Lotto";
import LottoPack from "../src/domain/LottoPack";
import generateAnswerLotto from "../src/domain/AnswerLottoPack";

describe("LottoPack 도메인 테스트", () => {
  const sampleLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 7, 8, 9, 6],
    [2, 3, 13, 4, 5, 6],
  ];
  test("갯수에 비례해 로또가 발행된다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    expect(lottoPack.lottos.length).toBe(sampleLottos.length);
  });

  test("Lotto Pack은 Lotto Instance들을 반환해야한다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    expect(lottoPack.lottos[0]).toBeInstanceOf(Lotto);
  });

  test("사용자가 구매한 로또 번호와 같은 당첨 번호 갯수를 센다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    const answerLotto = [1, 2, 3, 4, 5, 6];
    const answerTable = generateAnswerLotto(answerLotto, 7);
    const result = lottoPack.playCompare(answerTable);
    expect(result).toEqual({
      6: 1,
      "5+1": 0,
      5: 1,
      4: 0,
      3: 1,
    });
  });
});
