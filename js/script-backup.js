// TODO: Refazer todo o código abaixo na mão para entender cada parte.
// E ajustar o que for vendo que precisa. Exemplo: mensagens de error.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const labelDay = document.querySelector('label[for="day"]');
    const labelMonth = document.querySelector('label[for="month"]');
    const labelYear = document.querySelector('label[for="year"]');

    const inputDay = document.getElementById("day");
    const inputMonth = document.getElementById("month");
    const inputYear = document.getElementById("year");

    const day = inputDay.value;
    const month = inputMonth.value;
    const year = inputYear.value;

    const errorMessageDay = document.getElementById("error-message-day");
    const errorMessageMonth = document.getElementById("error-message-month");
    const errorMessageYear = document.getElementById("error-message-year");

    const yearsResult = document.getElementById("yearsResult");
    const monthsResult = document.getElementById("monthsResult");
    const daysResult = document.getElementById("daysResult");

    // Validar o campo do dia
    validateField(
      day,
      inputDay,
      labelDay,
      errorMessageDay,
      "This field is required",
      "Must be a valid day",
      (value) => isValidDay(value, year, month)
    );

    // Validar o campo do mês
    validateField(
      month,
      inputMonth,
      labelMonth,
      errorMessageMonth,
      "This field is required",
      "Must be a valid month",
      isValidMonth
    );

    // Validar o campo do ano
    validateField(
      year,
      inputYear,
      labelYear,
      errorMessageYear,
      "This field is required",
      "Must be in the past",
      isValidYear
    );

    if (
      errorMessageDay.textContent === "" &&
      errorMessageMonth.textContent === "" &&
      errorMessageYear.textContent === ""
    ) {
      const { ageYears, ageMonths, ageDays } = calculateAge(day, month, year);

      yearsResult.textContent = ageYears;
      monthsResult.textContent = ageMonths;
      daysResult.textContent = ageDays;
    }
  });
});

function isFieldEmpty(value) {
  return value === "" || isNaN(value);
}

function isValidDay(day, year, month) {
  return day >= 1 && day <= daysInMonth(year, month);
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear;
}

function validateField(
  value,
  inputElement,
  labelElement,
  errorMessageElement,
  emptyMessage,
  invalidMessage,
  validationFunction
) {
  if (isFieldEmpty(value)) {
    errorMessageElement.textContent = emptyMessage;
    errorMessageElement.classList.add("visible");
    inputElement.classList.add("invalid");
    labelElement.style.color = "#ff5959";
  } else if (!validationFunction(value)) {
    errorMessageElement.textContent = invalidMessage;
    errorMessageElement.classList.add("visible");
    inputElement.classList.add("invalid");
    labelElement.style.color = "#ff5959";
  } else {
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove("visible");
    inputElement.classList.remove("invalid");
    labelElement.style.color = "";
  }
}

function daysInMonth(year, month) {
  if (month < 1 || month > 12) {
    return 0;
  }

  if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  } else {
    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInEachMonth[month - 1];
  }
}

function calculateAge(day, month, year) {
  let currentDate = new Date();
  let ageYears = currentDate.getFullYear() - year;
  let ageMonths = currentDate.getMonth() + 1 - month;
  let ageDays = currentDate.getDate() - day;

  if (ageDays < 0) {
    ageMonths--;
    ageDays += daysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return { ageYears, ageMonths, ageDays };
}
