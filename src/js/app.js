// TODO: write code here

const cardTypes = [
  { name: "Visa", regex: /^4/, className: "visa" },
  {
    name: "Mastercard",
    regex: /^(5[1-5]|2[2][2-7]\d{3})/,
    className: "master",
  },
  { name: "American Express", regex: /^(34|37)/, className: "amex" },
  {
    name: "Discover",
    regex: /^(6011|622(12[6-9]|1[3-9][0-9]|2[0-8][0-9]|29[0-5])|64[4-9]|65)/,
    className: "discover",
  },
  { name: "JCB", regex: /^(352[8-9]|35[3-8][0-9]|358[0-9])/, className: "jcb" },
  { name: "Diners Club", regex: /^36/, className: "diners_club" },
  { name: "Mir", regex: /^2/, className: "mir" },
];

class CardValidator {
  detectCardType(cardNumber) {
    // Метод для определения типа карты на основе регулярных выражений
    for (const cardType of cardTypes) {
      if (cardType.regex.test(cardNumber)) {
        return cardType.className;
      }
    }
    return "Unknown";
  }

  isValidCardNumber(cardNumber) {
    const digits = [];
    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 2 === 0) {
        const digit = parseInt(cardNumber[i]) * 2;
        if (digit > 9) {
          digits.push(digit - 9);
        } else {
          digits.push(digit);
        }
      } else {
        const digit = parseInt(cardNumber[i]);
        digits.push(digit);
      }
    }
    //console.log(arr);
    var summ = digits.reduce(function (a, b) {
      return a + b;
    });
    return Boolean(!(summ % 10));
  }
}

class CardValidatorApp {
  constructor() {
    // Конструктор класса для инициализации приложения и установки обработчиков событий
    this.cardValidator = new CardValidator();
    this.setupEventListeners();
  }

  setActiveCard(cardType) {
    if (cardType === "Unknown") {
      document
        .querySelectorAll(".card img")
        .forEach((el) => el.classList.remove("inactive"));
      return;
    }
    document
      .querySelectorAll(".card img")
      .forEach((el) => el.classList.add("inactive"));
    document
      .querySelector(`.card.${cardType} img`)
      .classList.remove("inactive");
  }

  setCardVilidity(chekLuna) {
    const cardNumberElement = document.getElementById("card_number");
    if (chekLuna) {
      cardNumberElement.classList.remove("validation-error");
      cardNumberElement.classList.add("validation-success");
    } else {
      cardNumberElement.classList.remove("validation-success");
      cardNumberElement.classList.add("validation-error");
    }
  }
  setupEventListeners() {
    // Метод для установки обработчика события отправки формы
    document.getElementById("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const cardNumberInput = document.getElementById("card_number");
      const chekLuna = this.cardValidator.isValidCardNumber(
        cardNumberInput.value
      );
      this.setCardVilidity(chekLuna);
    });
    document
      .getElementById("card_number")
      .addEventListener("input", (event) => {
        const cardType = this.cardValidator.detectCardType(event.target.value);
        console.log(cardType);
        this.setActiveCard(cardType);
      });
  }
}

// Использование класса для запуска приложения
const cardValidatorApp = new CardValidatorApp();

// comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");
