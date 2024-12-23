window.addEventListener("DOMContentLoaded", () => {
  let budgetInput = document.getElementById("budget-input");
  let addBudgetBtn = document.querySelector(".add-budget");
  let budget = document.querySelector(".total-budget");
  let remaining = document.querySelector(".remaining-budget");
  let spent = document.querySelector(".spent-budget");

  let date = document.querySelector("#date");
  let amount = document.querySelector("#amount");
  let selectCategory = document.querySelector("#category-select");
  let description = document.querySelector("#description");
  let addExpenseBtn = document.querySelector(".add-expense-btn");

  let ulElem = document.querySelector(".budget-expense-list");
  let liElem = document.querySelectorAll(".expense-list-item");

  let addCateBtn = document.querySelector(".add-category-btn");
  let newCate = document.querySelector("#new-category");

  addBudgetBtn.addEventListener("click", () => {
    if (budgetInput.value !== "") {
      budget.innerHTML = Number(budget.innerHTML) + Number(budgetInput.value);
      remaining.innerHTML =
        Number(remaining.innerHTML) + Number(budgetInput.value);
      budgetInput.value = "";
    } else {
      alert("Please enter your amount");
    }
  });

  let noExpenseElem = document.createElement("p");
  noExpenseElem.innerHTML = "You don't have any expense.";
  function checkExpenseElement(liElem) {
    if (liElem) {
      noExpenseElem.remove();
    } else {
      ulElem.append(noExpenseElem);
    }
  }
  checkExpenseElement(liElem[0]);

  addExpenseBtn.addEventListener("click", (e) => {
    if (
      date.value !== "" &&
      selectCategory.value !== "" &&
      amount.value !== "" &&
      description.value !== ""
    ) {
      if (Number(amount.value) <= Number(remaining.innerHTML)) {
        const liElem = document.createElement("li");
        liElem.classList.add("expense-list-item");
        liElem.classList.add("flex");

        const cateElem = document.createElement("div");
        cateElem.classList.add("expense-list-item-selected-category");
        cateElem.innerText = selectCategory.value;

        const dateElem = document.createElement("div");
        dateElem.classList.add("expense-list-item-date");
        dateElem.innerText = date.value;

        const amountElem = document.createElement("div");
        amountElem.classList.add("expense-list-item-amount");
        amountElem.innerText = amount.value;

        const desElem = document.createElement("div");
        desElem.classList.add("expense-list-item-description");
        desElem.innerText = description.value;

        const buttonElem = document.createElement("div");
        buttonElem.classList.add("expense-list-item-button");
        buttonElem.classList.add("flex");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerText = "Edit";

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.innerText = "Delete";

        buttonElem.prepend(editBtn);
        buttonElem.append(delBtn);

        liElem.append(cateElem);
        liElem.append(dateElem);
        liElem.append(amountElem);
        liElem.append(desElem);
        liElem.append(buttonElem);

        ulElem.append(liElem);

        remaining.innerHTML = remaining.innerHTML - amount.value;
        spent.innerHTML = Number(spent.innerHTML) + Number(amount.value);

        date.value = "";
        amount.value = "";
        selectCategory.value = "";
        description.value = "";

        checkExpenseElement(liElem);

        if (e.target.innerText === "Update Expense") {
          e.target.innerText = "Add Expense";
        }

        editBtn.addEventListener("click", () => {
          selectCategory.value = cateElem.innerText;
          date.value = dateElem.innerText;
          amount.value = amountElem.innerText;
          description.value = desElem.innerText;
          addExpenseBtn.innerText = "Update Expense";
          remaining.innerHTML =
            Number(remaining.innerHTML) + Number(amountElem.innerText);
          spent.innerHTML =
            Number(spent.innerHTML) - Number(amountElem.innerText);
          liElem.remove();
        });

        delBtn.addEventListener("click", () => {
          remaining.innerHTML =
            Number(remaining.innerHTML) + Number(amountElem.innerText);
          spent.innerHTML =
            Number(spent.innerHTML) - Number(amountElem.innerText);
          liElem.remove();
          let liElems = document.querySelectorAll(".expense-list-item");
          console.log(liElems);
          checkExpenseElement(liElems[0]);
        });
      } else {
        alert(`Sorry! you have only ${remaining.innerHTML} amount remaining.`);
      }
    } else {
      alert("All fields are required");
    }
  });

  addCateBtn.addEventListener("click", () => {
    if (newCate.value !== "") {
      let catelist = document.createElement("option");
      catelist.classList.add("newCate.value");
      catelist.innerHTML = newCate.value;
      selectCategory.append(catelist);

      newCate.value = "";
    } else {
      alert("New category required");
    }
  });
});
