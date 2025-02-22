import { LOTTO_NUMBER_END, LOTTO_NUMBER_START } from "../src/constants/constant";
import LottoMachine from "../src/domain/LottoMachine";
import createSixRandomNumbers from "../src/domain/createSixRandomNumbers";

test("1~45 중 6개의 랜덤 값을 생성한다.", () => {
  const randomValue = createSixRandomNumbers();
  console.log(randomValue);
  expect(randomValue).toHaveLength(6);
  expect(randomValue.every((num) => num >= LOTTO_NUMBER_START && num <= LOTTO_NUMBER_END)).toBe(true);
});

test("주어진 count 값만큼 난수(6개의 랜덤값) 세트가 생성된다.", () => {
  const money = 3000;

  const { count, lottoPack } = LottoMachine(money);

  expect(lottoPack.lottos.length).toBe(money / 1000);
});
