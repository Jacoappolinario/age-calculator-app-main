const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const labelDay = document.querySelector('label[for="day"]');
  const labelMonth = document.querySelector('label[for="month"]');
  const labelYear = document.querySelector('label[for="year"]');

  const inputDay = document.getElementById("day");
  const inputMonth = document.getElementById("month");
  const inputYear = document.getElementById("year");

  const day = parseInt(inputDay.value);
  const month = parseInt(inputMonth.value);
  const year = parseInt(inputYear.value);

  const errorMessageDay = document.getElementById("error-message-day");
  const errorMessageMonth = document.getElementById("error-message-month");
  const errorMessageYear = document.getElementById("error-message-year");

  const yearsResult = document.getElementById("yearsResult");
  const monthsResult = document.getElementById("monthsResult");
  const daysResult = document.getElementById("daysResult");

  // Validate the field of the day
  validateField(
    day,
    inputDay,
    labelDay,
    errorMessageDay,
    "This field is required",
    "Must be a valid day",
    (value) => isValidDay(value, month, year)
  );

  // Validate the month field
  validateField(
    month,
    inputMonth,
    labelMonth,
    errorMessageMonth,
    "This field is required",
    "Must be a valid month",
    isValidMonth
  );

  // Validate the year field
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

function isFieldEmpty(value) {
  return value === "";
}

function isValidDay(day, month, year) {
  return day >= 1 && day <= daysInMonth(month, year);
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear;
}

function setErrorMessage(
  labelElement,
  inputElement,
  errorMessageElement,
  message
) {
  labelElement.style.color = "#ff5959";
  inputElement.classList.add("invalid");
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add("visible");
}

function clearErrorMessage(labelElement, inputElement, errorMessageElement) {
  labelElement.style.color = "";
  inputElement.classList.remove("invalid");
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove("visible");
}

function daysInMonth(month, year) {
  let day;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      day = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      day = 30;
      break;
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        day = 29;
      } else {
        day = 28;
      }
      break;
    default:
      day = -1;
  }

  return day;
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
    setErrorMessage(
      labelElement,
      inputElement,
      errorMessageElement,
      emptyMessage
    );
  } else if (!validationFunction(value)) {
    setErrorMessage(
      labelElement,
      inputElement,
      errorMessageElement,
      invalidMessage
    );
  } else {
    clearErrorMessage(labelElement, inputElement, errorMessageElement);
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
      currentDate.getMonth() + 1,
      currentDate.getFullYear()
    );
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return { ageYears, ageMonths, ageDays };
}
