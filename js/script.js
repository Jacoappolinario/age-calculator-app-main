const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  const errorMessageDay = document.getElementById("error-message-day");
  const errorMessageMonth = document.getElementById("error-message-month");
  const errorMessageYear = document.getElementById("error-message-year");

  // TODO: Ajustar a verificação se esta preenchido o campo e caso não esteja colocar a mensagem "This field is required"
  if (isNaN(day) || day < 1 || day > daysInMonth(year, month)) {
    errorMessageDay.textContent = "Must be a valid day";
    errorMessageDay.classList.add("visible");
  } else {
    errorMessageDay.textContent = "";
    errorMessageDay.classList.remove("visible");
  }

  // TODO: Ajustar a verificação se esta preenchido o campo e caso não esteja colocar a mensagem "This field is required"
  if (isNaN(month) || month < 1 || month > 12) {
    errorMessageMonth.textContent = "Must be a valid month";
    errorMessageMonth.classList.add("visible");
  } else {
    errorMessageMonth.textContent = "";
    errorMessageMonth.classList.remove("visible");
  }

  // TODO: Ajustar a verificação se esta preenchido o campo e caso não esteja colocar a mensagem "This field is required"
  if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    errorMessageYear.textContent = "Must be in the past"; //TODO: Arruma a mensagem dessa verificação
    errorMessageYear.classList.add("visible");
  } else {
    errorMessageYear.textContent = "";
    errorMessageYear.classList.remove("visible");
  }

  // Se todos os campos forem válidos, você pode calcular a idade
  if (
    errorMessageDay.textContent === "" &&
    errorMessageMonth.textContent === "" &&
    errorMessageYear.textContent === ""
  ) {
    //TODO: Implementar o cálculo da idade e colocar os resultados nos spans abaixo
    const yearsResult = document.getElementById("yearsResult");
    const monthsResult = document.getElementById("monthsResult");
    const daysResult = document.getElementById("daysResult");

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

    yearsResult.textContent = ageYears;
    monthsResult.textContent = ageMonths;
    daysResult.textContent = ageDays;
  }
});

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
