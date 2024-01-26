// TODO: write code here

// comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");

const cardTypes = [
  { name: "Visa", regex: /4/ },
  { name: "Mastercard", regex: /^(5[1-5]|2[2][2-7]\d{3})$/ },
  { name: "American Express", regex: /^(34|37)$/ },
  {
    name: "Discover",
    regex: /^(6011|622(12[6-9]|1[3-9][0-9]|2[0-8][0-9]|29[0-5])|64[4-9]|65)$/,
  },
  { name: "JCB", regex: /^(352[8-9]|35[3-8][0-9]|358[0-9])$/ },
  { name: "Diners Club", regex: /^36$/ },
  { name: "Mir", regex: /^2$/ },
];

class CardValidator {
  constructor() {
    // Конструктор класса, принимающий номер карты и убирающий пробелы из него
    // this.cardNumber = cardNumber.replace(/\s/g, "");
  }

  isValid() {
    // Метод для проверки валидности карты, используя другие методы класса
    return this.isValidCardNumber() && this.detectCardType() !== "Unknown";
  }

  detectCardType(cardNumber) {
    // Метод для определения типа карты на основе регулярных выражений

    for (const cardType of cardTypes) {
      if (cardType.regex.test(cardNumber)) {
        return cardType.name;
      }
    }
    return "Unknown";
  }
  // isValidCardNumber() {
  //   // Метод для проверки валидности номера карты по алгоритму Луна
  //   let sum = 0;
  //   let shouldDouble = false;

  //   for (let i = this.cardNumber.length - 1; i >= 0; i--) {
  //     let digit = parseInt(this.cardNumber.charAt(i));
  //     if (shouldDouble) {
  //       digit *= 2;
  //       if (digit > 9) {
  //         digit -= 9;
  //       }
  //     }
  //     sum += digit;
  //     shouldDouble = !shouldDouble;
  //   }

  //   return sum % 10 === 0;
  // }
}

class CardValidatorApp {
  constructor() {
    // Конструктор класса для инициализации приложения и установки обработчиков событий
    this.cardValidator = new CardValidator();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Метод для установки обработчика события отправки формы
    // document.getElementById("form").addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   this.validateCard();
    // });
    document
      .getElementById("card_number")
      .addEventListener("input", (event) => {
        const cardType = this.cardValidator.detectCardType(event.target.value);
        console.log(cardType);
      });
  }

  validateCard() {
    // Метод для валидации введенного номера карты и вывода результата
    const cardNumberInput = document.getElementById("card_number");
    const cardNumber = cardNumberInput.value;

    if (cardValidator.isValid()) {
      const cardType = cardValidator.detectCardType();
      alert(`Card is valid. Card type: ${cardType}`);
    } else {
      alert("Invalid card number");
    }
  }
}

// Использование класса для запуска приложения
const cardValidatorApp = new CardValidatorApp();
