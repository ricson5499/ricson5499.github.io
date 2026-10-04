#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper to remove comments from JS
function removeComments(str) {
  return str
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
    .replace(/\/\/.*$/gm, '');         // Remove // comments
}

// Load meals data
const mealsPath = path.join(__dirname, '../tool/eatpage/data/meals.js');
const mealsContent = fs.readFileSync(mealsPath, 'utf8');
const mealsClean = removeComments(mealsContent);
const mealsMatch = mealsClean.match(/const MEALS = (\[[\s\S]*?\]);/);
if (!mealsMatch) {
  console.error('Failed to parse MEALS data');
  process.exit(1);
}
const MEALS = JSON.parse(mealsMatch[1]);

// Load recipes data
const recipesPath = path.join(__dirname, '../tool/eatpage/data/recipes.js');
const recipesContent = fs.readFileSync(recipesPath, 'utf8');
const recipesClean = removeComments(recipesContent);
const recipesMatch = recipesClean.match(/const RECIPES = (\[[\s\S]*?\]);/);
if (!recipesMatch) {
  console.error('Failed to parse RECIPES data');
  process.exit(1);
}
const RECIPES = JSON.parse(recipesMatch[1]);

// Generate initial meals HTML (first 15 items for SEO)
const initialMeals = MEALS.slice(0, 15);
let mealsHtml = '';

initialMeals.forEach(meal => {
  const mealTypes = Array.isArray(meal.meal) ? meal.meal.join(' / ') : meal.meal;
  const foodTypes = Array.isArray(meal.type) ? meal.type.join(' / ') : meal.type;
  
  mealsHtml += `        <div class="card">
          <h4>${meal.name}</h4>
          <div class="muted">
            ${mealTypes} • ${foodTypes} • ${meal.location}
          </div>
          <div class="small muted" style="margin-top:6px;">${meal.note || ''}</div>
        </div>\n`;
});

// Generate initial recipes HTML (first 12 items for SEO)
const initialRecipes = RECIPES.slice(0, 12);
let recipesHtml = '';

initialRecipes.forEach(recipe => {
  recipesHtml += `        <div class="card">
          <h4>${recipe.title}</h4>
          <div class="muted">
            ${recipe.category} • ${recipe.cuisine}
          </div>
          <div class="small muted" style="margin-top:6px;">
            <strong>材料：</strong> ${recipe.ingredients.slice(0, 3).join(', ')}...
          </div>
        </div>\n`;
});

// Update Eat Page index.html
let eatPageHtml = fs.readFileSync(path.join(__dirname, '../tool/eatpage/index.html'), 'utf8');
eatPageHtml = eatPageHtml.replace(
  '<!-- INITIAL_MEALS_PLACEHOLDER -->',
  mealsHtml.trim()
);
fs.writeFileSync(path.join(__dirname, '../tool/eatpage/index.html'), eatPageHtml);
console.log('✓ Generated Eat Page index.html with initial meals');

// Update Recipes index.html
let recipesPageHtml = fs.readFileSync(path.join(__dirname, '../tool/eatpage/recipes.html'), 'utf8');
recipesPageHtml = recipesPageHtml.replace(
  '<!-- INITIAL_RECIPES_PLACEHOLDER -->',
  recipesHtml.trim()
);
fs.writeFileSync(path.join(__dirname, '../tool/eatpage/recipes.html'), recipesPageHtml);
console.log('✓ Generated Recipes index.html with initial recipes');
