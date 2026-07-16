const sampleRecipes = [
  {
    id: crypto.randomUUID(),
    name: 'Crispy Avocado Toast',
    description: 'Toasted sourdough topped with mashed avocado, chili flakes, and a fried egg.',
    favorite: true
  },
  {
    id: crypto.randomUUID(),
    name: 'Herb Roasted Chicken',
    description: 'Simple roasted chicken with garlic, rosemary, and lemon for a cozy dinner.',
    favorite: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Berry Yogurt Parfait',
    description: 'Layered yogurt, fresh berries, and granola for a quick breakfast.',
    favorite: false
  }
];

const recipeForm = document.getElementById('recipe-form');
const recipeNameInput = document.getElementById('recipe-name');
const recipeDescriptionInput = document.getElementById('recipe-description');
const recipeList = document.getElementById('recipe-list');
const recipeCount = document.getElementById('recipe-count');

let recipes = [...sampleRecipes];

function renderRecipes() {
  const sortedRecipes = [...recipes].sort((a, b) => Number(b.favorite) - Number(a.favorite));

  recipeList.innerHTML = '';

  if (sortedRecipes.length === 0) {
    recipeList.innerHTML = '<li class="recipe-item"><div class="recipe-content"><p>No recipes yet. Add one above to get started.</p></div></li>';
  } else {
    const fragment = document.createDocumentFragment();

    sortedRecipes.forEach((recipe) => {
      const item = document.createElement('li');
      item.className = 'recipe-item';

      item.innerHTML = `
        <div class="recipe-content">
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
        </div>
        <div class="recipe-actions">
          <button class="favorite-btn ${recipe.favorite ? 'active' : ''}" data-action="favorite" data-id="${recipe.id}" type="button" aria-label="${recipe.favorite ? 'Remove favorite' : 'Mark as favorite'}">★</button>
          <button class="delete-btn" data-id="${recipe.id}" type="button">Delete</button>
        </div>
      `;

      fragment.appendChild(item);
    });

    recipeList.appendChild(fragment);
  }

  recipeCount.textContent = `${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`;
}

recipeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = recipeNameInput.value.trim();
  const description = recipeDescriptionInput.value.trim();

  if (!name || !description) {
    return;
  }

  recipes.unshift({
    id: crypto.randomUUID(),
    name,
    description,
    favorite: false
  });

  recipeForm.reset();
  renderRecipes();
});

recipeList.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('button[data-action="favorite"]');

  if (favoriteButton) {
    const id = favoriteButton.dataset.id;
    recipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    );
    renderRecipes();
    return;
  }

  const deleteButton = event.target.closest('button[data-id]');

  if (!deleteButton) {
    return;
  }

  const id = deleteButton.dataset.id;
  recipes = recipes.filter((recipe) => recipe.id !== id);
  renderRecipes();
});

renderRecipes();
