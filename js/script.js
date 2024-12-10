// TODO: Passar as mensagens para o inglês
// TODO: Adicionar animação nos números

class AgeCalculator {
  constructor() {
    this.form = document.querySelector(".form");
    this.inputs = {
      day: document.getElementById("day"),
      month: document.getElementById("month"),
      year: document.getElementById("year"),
    };
    this.labels = Object.fromEntries(
      Object.entries(this.inputs).map(([key, input]) => [
        key,
        document.querySelector(`label[for="${input.id}"]`),
      ])
    );
    this.errorElements = Object.fromEntries(
      Object.entries(this.inputs).map(([key]) => [
        key,
        document.getElementById(`error-message-${key}`),
      ])
    );
    this.results = {
      years: document.getElementById("yearsResult"),
      months: document.getElementById("monthsResult"),
      days: document.getElementById("daysResult"),
    };

    this.init();
  }

  validateInput(value, { min, max, errorMessage }) {
    if (!value.trim()) {
      return { isValid: false, error: "Este campo é obrigatório" };
    }

    const numValue = parseInt(value);
    if (numValue < min || numValue > max) {
      return { isValid: false, error: errorMessage };
    }

    return { isValid: true };
  }

  validateDate() {
    const validations = {
      day: {
        min: 1,
        max: 31,
        errorMessage: "Dia Inválido",
      },
      month: {
        min: 1,
        max: 12,
        errorMessage: "Mês Inválido",
      },
      year: {
        min: 1,
        max: new Date().getFullYear(),
        errorMessage: "Ano deve estar no passado",
      },
    };

    let isValid = true;
    this.resetAllFields();

    for (const [field, input] of Object.entries(this.inputs)) {
      const { isValid: fieldValid, error } = this.validateInput(
        input.value,
        validations[field]
      );

      if (!fieldValid) {
        this.showError(input, error);
        isValid = false;
      }
    }

    if (isValid) {
      const date = this.getInputDate();
      if (!this.isValidDate(date)) {
        this.showError(this.inputs.day, "Data Inválida");
        return false;
      }
    }

    return isValid;
  }

  getInputDate() {
    return new Date(
      this.inputs.year.value,
      this.inputs.month.value - 1,
      this.inputs.day.value
    );
  }

  isValidDate(date) {
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.getDate() === parseInt(this.inputs.day.value)
    );
  }

  showError(input, message) {
    input.classList.add("invalid");
    this.labels[input.name].style.color = "var(--color-7)";
    this.errorElements[input.name].textContent = message;
    this.errorElements[input.name].classList.add("visible");
  }

  resetFieldState(input) {
    input.classList.remove("invalid");
    this.labels[input.name].style.color = "";
    this.errorElements[input.name].textContent = "";
    this.errorElements[input.name].classList.remove("visible");
  }

  resetAllFields() {
    Object.values(this.inputs).forEach((input) => this.resetFieldState(input));
  }

  calculateAge() {
    const birthDate = this.getInputDate();
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajustes necessários quando o dia/mês atual é menor que o de nascimento
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days += lastMonth.getDate();
      months--;
    }

    this.updateResults({ years, months, days });
  }

  updateResults({ years, months, days }) {
    Object.entries({ years, months, days }).forEach(([key, value]) => {
      this.results[key].textContent = value;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateDate()) {
      this.calculateAge();
    }
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    Object.values(this.inputs).forEach((input) => {
      input.addEventListener("input", () => this.resetFieldState(input));
    });
  }
}

new AgeCalculator();
