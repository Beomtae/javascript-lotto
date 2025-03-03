var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _lottoNumbers, _Lotto_instances, ascendingSort_fn, _lottos;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const WINNING = "당첨 번호";
const BONUS = "보너스 번호";
const LOTTO_NUMBER_MAX_LENGTH = 6;
const LOTTO_NUMBER_START = 1;
const LOTTO_NUMBER_END = 45;
const HUNDRED_PERCENT = 100;
const LOTTO_PURCHASE_UNIT = 1e3;
const MIN_WINNING_COUNT = 3;
const BONUS_CONDITION_COUNT = 5;
const BONUS_MATCH = 1;
const BONUS_PRIZE_KEY = "5+1";
const YES = "y";
const NO = "n";
const LOTTO_NUMBER_SPLITER = ",";
class Lotto {
  constructor(lottoNumbers) {
    __privateAdd(this, _Lotto_instances);
    __privateAdd(this, _lottoNumbers);
    __privateSet(this, _lottoNumbers, __privateMethod(this, _Lotto_instances, ascendingSort_fn).call(this, lottoNumbers));
  }
  compareWinningNumbers(answerLotto) {
    const winningCount = __privateGet(this, _lottoNumbers).filter((number) => answerLotto[number] === WINNING).length;
    const bonusCount = __privateGet(this, _lottoNumbers).filter((number) => answerLotto[number] === BONUS).length;
    return { winningCount, bonusCount };
  }
  get lottoNumbers() {
    return __privateGet(this, _lottoNumbers);
  }
}
_lottoNumbers = new WeakMap();
_Lotto_instances = new WeakSet();
ascendingSort_fn = function(lottoNumbers) {
  return [...lottoNumbers].sort((a, b) => a - b);
};
class LottoPack {
  constructor(lottos) {
    __privateAdd(this, _lottos);
    __privateSet(this, _lottos, lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    }));
  }
  playCompare(answerLotto) {
    const result = { 6: 0, "5+1": 0, 5: 0, 4: 0, 3: 0 };
    __privateGet(this, _lottos).forEach((lotto) => {
      const { winningCount, bonusCount } = lotto.compareWinningNumbers(answerLotto);
      if (winningCount < MIN_WINNING_COUNT) return;
      const key = winningCount === BONUS_CONDITION_COUNT && bonusCount === BONUS_MATCH ? BONUS_PRIZE_KEY : winningCount;
      result[key] += 1;
    });
    return result;
  }
  get lottos() {
    return __privateGet(this, _lottos).map((lotto) => new Lotto([...lotto.lottoNumbers]));
  }
}
_lottos = new WeakMap();
const generateRandomNumber = (start, end) => Math.floor(Math.random() * end - start + 1) + start;
const pushRandomNumbers = (randomNumbers) => {
  while (randomNumbers.length < LOTTO_NUMBER_MAX_LENGTH) {
    const randomNumber = generateRandomNumber(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};
const createSixRandomNumbers = () => {
  const initialRandomNumbers = [];
  const randomNumbers = pushRandomNumbers(initialRandomNumbers);
  if (new Set(randomNumbers).size !== randomNumbers.length) createSixRandomNumbers();
  return randomNumbers;
};
const generateLottoNumbersSet = (count) => {
  const lottoNumbersSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumbers();
    lottoNumbersSet.push(sixRandomNumber);
  }
  return lottoNumbersSet;
};
const purchaseLottoCount = (money) => money / LOTTO_PURCHASE_UNIT;
const LottoMachine = (purchaseAmount) => {
  const count = purchaseLottoCount(purchaseAmount);
  const lottoNumbersSet = generateLottoNumbersSet(count);
  const lottoPack = new LottoPack(lottoNumbersSet);
  return { count, lottoPack };
};
const ERROR_MESSAGE = Object.freeze({
  NOT_DIVISIBLE_BY_UNIT: "구매 가격은 1000원 단위로 입력해주세요.",
  INVALID_INPUT_PRICE: "숫자 값만 입력해주세요.",
  INVALID_WINNING_NUMBERS_FORMAT: "숫자와 구분자로 입력해주세요.",
  INVALID_WINNING_NUMBERS_COUNT: "6개의 숫자를 입력해주세요.",
  INVALID_WINNING_NUMBERS_TYPE: "6개의 값 모두 숫자로 입력해주세요.",
  INVALID_WINNING_NUMBERS_RANGE: "6개의 숫자는 1~45 사이로 입력해주세요.",
  DUPLICATE_WINNING_NUMBERS: "6개의 숫자는 중복없이 입력해주세요.",
  INVALID_BONUS_NUMBER_TYPE: "보너스 번호는 숫자로 입력해주세요.",
  INVALID_BONUS_NUMBER_RANGE: "보너스 번호는 1~45 사이로 입력해주세요.",
  DUPLICATE_BONUS_NUMBER: "보너스 번호는 당첨번호와 중복되지 않게 입력해주세요.",
  INVALID_RESTART_FORMAT: "재시작 여부는 y 또는 n으로 입력해주세요."
});
const Validator = {
  isEmpty(input) {
    return !input;
  },
  isNotDivisible(purchaseAmount) {
    return purchaseAmount % LOTTO_PURCHASE_UNIT !== 0;
  },
  isFormat(winningNumbers) {
    return winningNumbers.length === 1;
  },
  isNotNumber(winningNumbers) {
    return winningNumbers.some((number) => isNaN(number));
  },
  isMaxLength(winningNumbers) {
    return winningNumbers.length !== LOTTO_NUMBER_MAX_LENGTH;
  },
  isWinningNumbersRange(winningNumbers) {
    return !winningNumbers.every((num) => num >= LOTTO_NUMBER_START && num <= LOTTO_NUMBER_END);
  },
  isDuplicate(winningNumbers) {
    return new Set(winningNumbers).size !== winningNumbers.length;
  },
  isBonusNumberRange(bonusNumber) {
    return bonusNumber < LOTTO_NUMBER_START || bonusNumber > LOTTO_NUMBER_END;
  },
  isIncludeNumber(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  },
  isYesOrNo(input) {
    return input !== YES && input !== NO;
  },
  isYes(input) {
    return input === YES;
  },
  isNo(input) {
    return input === NO;
  }
};
const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);
  if (Validator.isEmpty(purchaseAmount)) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
  if (Validator.isNotDivisible(purchaseAmount)) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);
  return purchaseAmount;
};
const resultSection$1 = document.querySelector(".result_section");
const winningSection$1 = document.querySelector(".winning_number_section");
const prepareCompare = () => {
  try {
    const purchaseAmount = document.querySelector(".purchase_input").value;
    validatePurchaseAmount(purchaseAmount);
    const { count, lottoPack } = LottoMachine(purchaseAmount);
    updatePurchaseUI(count);
    updateRandomLottoUI(lottoPack);
    resultSection$1.style.display = "block";
    winningSection$1.style.display = "block";
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
const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(LOTTO_NUMBER_SPLITER).map((number) => Number(number.trim()));
  if (Validator.isFormat(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_FORMAT);
  if (Validator.isMaxLength(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_COUNT);
  if (Validator.isNotNumber(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
  if (Validator.isWinningNumbersRange(winningNumbers)) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
  if (Validator.isDuplicate(winningNumbers)) throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
  return winningNumbers;
};
const validateBonusNumber = (winningNumbers) => {
  return (bonusNumberInput) => {
    const bonusNumber = Number(bonusNumberInput);
    if (Validator.isEmpty(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    if (Validator.isBonusNumberRange(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    if (Validator.isIncludeNumber(winningNumbers, bonusNumber)) throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    return bonusNumber;
  };
};
const generateAnswerLotto = (winningNumbers, bonusNumber) => {
  const answerLotto = {};
  winningNumbers.forEach((number) => {
    answerLotto[number] = WINNING;
  });
  answerLotto[bonusNumber] = BONUS;
  return answerLotto;
};
const WINNING_PRICE = {
  6: 2e9,
  "5+1": 3e7,
  5: 15e5,
  4: 5e4,
  3: 5e3
};
const processDecimalPoint = (rate) => {
  if (rate % 1 === 0) {
    return rate;
  } else if (rate * 10 % 1 === 0) {
    return rate.toFixed(1);
  }
  return rate.toFixed(2);
};
const profitCalculator = (purchaseAmount, winningResult2) => {
  const totalWinningAmount = Object.entries(winningResult2).reduce((count, [matchCount, winningCount]) => {
    return count + WINNING_PRICE[matchCount] * winningCount;
  }, 0);
  const rate = totalWinningAmount / purchaseAmount * HUNDRED_PERCENT;
  const profitRate = processDecimalPoint(rate);
  return profitRate;
};
const winningResult = (purchaseAmount, lottoPack) => {
  try {
    const { winningNumbers, bonusNumberInput } = validateInputs();
    const modal2 = document.querySelector(".modal_overlay");
    modal2.style.display = "block";
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumberInput);
    const winningResult2 = lottoPack.playCompare(answerLotto);
    updateResultUI(winningResult2);
    updateProfitUI(purchaseAmount, winningResult2);
  } catch (error) {
    resetInputs();
    window.alert(error.message);
  }
};
const validateInputs = () => {
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  const winningNumbers = [...winningNumberInputs].map((winningNumber) => {
    return Number(winningNumber.value);
  });
  validateWinningNumbers(winningNumbers.join(","));
  const bonusNumberInput = Number(document.querySelector(".bonus_number_input").value);
  validateBonusNumber(winningNumbers)(bonusNumberInput);
  return { winningNumbers, bonusNumberInput };
};
const resetInputs = () => {
  [...document.querySelectorAll(".winning_number_input")].map((winningNumber) => {
    winningNumber.value = "";
  });
  document.querySelector(".bonus_number_input").value = "";
};
const updateResultUI = (winningResult2) => {
  const matchCountElements = {
    3: document.getElementById("match_3"),
    4: document.getElementById("match_4"),
    5: document.getElementById("match_5"),
    "5+1": document.getElementById("match_5+1"),
    6: document.getElementById("match_6")
  };
  Object.entries(matchCountElements).forEach(([key, element]) => {
    element.textContent = `${winningResult2[key]}개`;
  });
};
const updateProfitUI = (purchaseAmount, winningResult2) => {
  const profitRate = profitCalculator(purchaseAmount, winningResult2);
  const profitResult = document.querySelector(".profit");
  profitResult.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
};
const resultButton = document.querySelector(".result_check_button");
const restartButton = document.querySelector(".restart");
const closeButton = document.querySelector(".close_button");
const modal = document.querySelector(".modal_overlay");
const purchaseInput = document.querySelector(".purchase_input");
const purchaseButton = document.querySelector(".purchase_button");
const resultSection = document.querySelector(".result_section");
const winningSection = document.querySelector(".winning_number_section");
document.addEventListener("DOMContentLoaded", () => {
  purchaseButton.addEventListener("click", handlePurchase);
  purchaseInput.addEventListener("keyup", handleEnterKey);
});
const handlePurchase = () => {
  const { purchaseAmount, lottoPack } = prepareCompare();
  if (purchaseAmount && lottoPack) {
    resultButton.removeEventListener("click", handleWinningResult);
    restartButton.removeEventListener("click", restart);
    closeButton.removeEventListener("click", closeModal);
    resultButton.addEventListener("click", () => handleWinningResult(purchaseAmount, lottoPack));
    restartButton.addEventListener("click", restart);
    closeButton.addEventListener("click", closeModal);
  }
};
const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    handlePurchase();
  }
};
const handleWinningResult = (purchaseAmount, lottoPack) => {
  winningResult(purchaseAmount, lottoPack);
};
const closeModal = () => {
  modal.style.display = "none";
};
const restart = () => {
  document.querySelector(".purchase_input").value = "";
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  [...winningNumberInputs].map((winningNumber) => {
    return winningNumber.value = "";
  });
  document.querySelector(".bonus_number_input").value = "";
  modal.style.display = "none";
  resultSection.style.display = "none";
  winningSection.style.display = "none";
};
