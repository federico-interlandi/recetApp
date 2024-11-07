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
  selectedRecipe: RecipeModel | null = null;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(refresh? :boolean): void {
    this.recipeService.getRecipes$(refresh).subscribe({
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

  openRecipeDetail(recipe: RecipeModel): void {
    this.selectedRecipe = recipe;
  }

  closeRecipeDetail(): void {
    this.selectedRecipe = null;
  }

  updateRecipe(updatedRecipe: RecipeModel): void {
    // console.log(updatedRecipe);
    if(updatedRecipe._id) this.recipeService.updateRecipe$(updatedRecipe._id, updatedRecipe).subscribe({
      next: (data) => {
        this.loadRecipes(true);
        this.closeRecipeDetail();
      },
      error: (err) => {
        console.error('Error al actualizar receta:', err);
      }
     })
  }

  removeRecipe(id: string): void {
    this.recipeService.removeRecipe$(id).subscribe({
      next: (data) => {
        this.loadRecipes(true);
        this.closeRecipeDetail();
      },
      error: (err) => {
        console.error('Error al eliminar receta:', err);
      }
    });
  }
}
