document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mealPlanForm');
  const generateButton = document.getElementById('generateButton');
  const printButton = document.getElementById('printButton');
  const downloadButton = document.getElementById('downloadButton');

  // Generate inputs for each day's meals
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const meals = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];
  const mealInputs = document.getElementById('mealInputs');

  days.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.innerHTML = `<h4>${day}</h4>`;
    meals.forEach((meal) => {
      dayDiv.innerHTML += `<label for="${day}-${meal}">${meal}:</label>
                                 <input type="text" id="${day}-${meal}" name="${day}-${meal}"><br>`;
    });
    mealInputs.appendChild(dayDiv);
  });

  // Generate Meal Plan
  generateButton.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // Get user input
    const userName = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;
    const mealPlan = {};

    days.forEach((day) => {
      mealPlan[day] = {};
      meals.forEach((meal) => {
        mealPlan[day][meal] =
          document.getElementById(`${day}-${meal}`).value || 'Not provided';
      });
    });

    // Build new web page
    document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Weekly Meal Plan</title>
                <style>
                    body { font-family: monospace; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 5px; text-align: left; }
                </style>
            </head>
            <body>
                <h1>${userName}'s Weekly Meal Plan</h1>
                <h2>Goal: ${goal}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Breakfast</th>
                            <th>Snack 1</th>
                            <th>Lunch</th>
                            <th>Snack 2</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(mealPlan)
                          .map(
                            ([day, meals]) => `
                            <tr>
                                <td>${day}</td>
                                ${Object.values(meals)
                                  .map((meal) => `<td>${meal}</td>`)
                                  .join('')}
                            </tr>
                        `
                          )
                          .join('')}
                    </tbody>
                </table>
                <button onclick="window.print()">Print this page</button>
                <button onclick="window.location.reload()">Go Back</button>
            </body>
            </html>
        `);
  });

  // Show print and download buttons after generation
  printButton.style.display = 'block';
  downloadButton.style.display = 'block';
});
