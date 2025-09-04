const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

  resultEl.innerText = password || "Selecione pelo menos uma opção!";
});

clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password || password === "Clique em \"Gerar Senha\"" || password === "Selecione pelo menos uma opção!") {
    alert("Nenhuma senha para copiar!");
    return;
  }
  navigator.clipboard.writeText(password);
  alert("Senha copiada para a área de transferência!");
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesArr = [];

  if (lower) typesArr.push(getRandomLower);
  if (upper) typesArr.push(getRandomUpper);
  if (number) typesArr.push(getRandomNumber);
  if (symbol) typesArr.push(getRandomSymbol);

  if (typesArr.length === 0) return "";

  for (let i = 0; i < length; i++) {
    const randomFunc = typesArr[Math.floor(Math.random() * typesArr.length)];
    generatedPassword += randomFunc();
  }

  return generatedPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
