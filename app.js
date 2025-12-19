const API_URL = "https://pet-ci-cd-backend.onrender.com/api/nutrition";

const input = document.getElementById("ingredient-input");
const addBtn = document.getElementById("add-btn");
const menuBody = document.getElementById("menu-body");

const totalCalories = document.getElementById("total-calories");
const totalProtein = document.getElementById("total-protein");
const totalFat = document.getElementById("total-fat");
const totalCarbs = document.getElementById("total-carbs");

let totals = {
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0
};

addBtn.addEventListener("click", async () => {
  const ingredient = input.value.trim();
  if (!ingredient) return;

  try 
  {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredient })
      });
   
    if (!res.ok) {
      alert(`API error: ${res.status}`);
      return;
    }

    const data = await res.json();
    const n = data.nutrition;

    addRow(ingredient, n);
    updateTotals(n);

    input.value = "";
  } catch (err) {
    console.error(err);
    alert("Request failed, see console");
  }
});

function addRow(ingredient, n) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${ingredient}</td>
    <td>${n.calories_total}</td>
    <td>${n.protein_total}</td>
    <td>${n.total_fat_total}</td>
    <td>${n.carbohydrates_total}</td>
  `;

  menuBody.appendChild(tr);
}

function updateTotals(n) {
  totals.calories += n.calories_total;
  totals.protein += n.protein_total;
  totals.fat += n.total_fat_total;
  totals.carbs += n.carbohydrates_total;

  totalCalories.textContent = totals.calories.toFixed(1);
  totalProtein.textContent = totals.protein.toFixed(1);
  totalFat.textContent = totals.fat.toFixed(1);
  totalCarbs.textContent = totals.carbs.toFixed(1);
}
