import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: RecipeModel[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes$().subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error al cargar recetas:', err);
      }
    });
  }

  toggleFavorite(recipe: any): void {
    recipe.isFavorite = !recipe.isFavorite;
    this.recipeService.updateRecipeInLocalStorage(recipe);
    if(recipe.isFavorite) this.recipeService.addToFavorites(recipe);
    else this.recipeService.removeFromFavorites(recipe);
  }
}
