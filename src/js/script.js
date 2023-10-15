const form = document.querySelector(".credit__form");

const loanAmount = document.getElementById("loanAmount");
const loanAmountSlider = document.getElementById("loanAmountSlider");
const loanAmountValue = document.getElementById("loanAmountValue");

const loanTerm = document.getElementById("loanTerm");
const loanTermSlider = document.getElementById("loanTermSlider");
const loanTermValue = document.getElementById("loanTermValue");

const submitButton = document.querySelector(".form__btn");

// Створення додаткових елементів для показу помилок
const loanAmountError = document.createElement("span");
loanAmountError.className = "loanAmountError";
loanAmountValue.after(loanAmountError);

const loanTermError = document.createElement("span");
loanTermError.className = "loanTermError";
loanTermValue.after(loanTermError);

//Отримані дані
let loanAmountResult = "1000";
let loanTermResult = "7";

addCreditInfoElements();

function checkInput() {
    if (loanAmountResult >= 1000 && loanTermResult >= 7) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

loanAmount.addEventListener("input", () => {
    loanAmountSlider.value = loanAmount.value;
    loanAmountValue.textContent = loanAmount.value;
    loanAmount.value = loanAmount.value.replace(/\D/g, "");

    const loanAmountLength = parseFloat(loanAmount.value);
    if (loanAmountLength > 50000) {
        loanAmountError.textContent = "Сума кредиту не може бути більше 50000";
    } else if (loanAmount.value.charAt(0) === "0") {
        loanAmountError.textContent = "Перше число не може бути 0";
    } else if (loanAmountLength < 1000) {
        loanAmountError.textContent = "Сума кредиту не може бути менша 1000";
    } else {
        loanAmountError.textContent = "";
        loanAmountResult = loanAmount.value;
    }
});

loanAmount.addEventListener("change", () => {
    checkInput();
    calculationCreditInfo();
});

loanAmountSlider.addEventListener("input", () => {
    loanAmount.value = loanAmountSlider.value;
    loanAmountValue.textContent = loanAmountSlider.value;
    loanAmountResult = loanAmount.value;
    checkInput();
    calculationCreditInfo();
});

loanTerm.addEventListener("input", () => {
    loanTermSlider.value = loanTerm.value;
    loanTermValue.textContent = loanTerm.value;
    loanTerm.value = loanTerm.value.replace(/\D/g, "");

    const loanTermLength = parseFloat(loanTerm.value);
    if (loanTerm.value.charAt(0) === "0") {
        loanTermError.textContent = "Перше число не може бути 0";
    } else if (loanTermLength < 7) {
        loanTermError.textContent = "Кількість днів не може бути меншою 7";
    } else if (loanTermLength > 60) {
        loanTermError.textContent = "Кількість днів не може бути більше 60";
    } else {
        loanTermError.textContent = "";
        loanTermResult = loanTerm.value;
    }
});

loanTerm.addEventListener("change", () => {
    checkInput();
    calculationCreditInfo();
});

loanTermSlider.addEventListener("input", () => {
    loanTerm.value = loanTermSlider.value;
    loanTermValue.textContent = loanTermSlider.value;
    loanTermResult = loanTerm.value;
    checkInput();
    calculationCreditInfo();
});

function addCreditInfoElements() {
    // Створення додаткових елементів для показу розрахунків
    const dataCalculation = document.createElement("div");

    const sumOfTheDay = document.createElement("h3");
    sumOfTheDay.textContent = "Сума щоденного погашення:";

    const sumDay = document.createElement("p");
    sumDay.className = "sum-day";

    const totalRepayment = document.createElement("h3");
    totalRepayment.textContent = "Загальна сума погашення:";

    const totalSum = document.createElement("p");
    totalSum.className = "total-sum";

    dataCalculation.prepend(sumOfTheDay, sumDay, totalRepayment, totalSum);

    submitButton.before(dataCalculation);
}

function calculationCreditInfo() {
    //Розрахунок
    //Денна сума погашень
    const ir = 2.2;
    const la = parseFloat(loanAmountResult);
    const rp = parseFloat(loanTermResult);

    const dailyRepayment = (la + la * (ir / 100) * rp) / rp;
    const sumDay = document.querySelector(".sum-day");
    console.log(sumDay);
    if (loanAmount.value.charAt(0) === "0") {
        sumDay.textContent = "";
        totalSum.textContent = "";
    } else {
        sumDay.textContent = Math.round(dailyRepayment);
    }
    //Сума повного погашення
    const fullRepayment = dailyRepayment * rp;
    const totalSum = document.querySelector(".total-sum");
    if (loanTerm.value.charAt(0) === "0") {
        totalSum.textContent = "";
        sumDay.textContent = "";
    } else {
        totalSum.textContent = Math.round(fullRepayment);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
});
