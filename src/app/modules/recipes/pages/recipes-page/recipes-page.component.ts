import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { SearchService } from '@shared/services/search.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  recipes: RecipeModel[] = [];
  recipeSuscription: Subscription = new Subscription();
  recipesResult: RecipeModel[] = [];
  searchTerm: string = '';

  constructor(
    readonly recipeService: RecipeService,
    private readonly router: Router,
    private localStorageService: LocalStorageService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.recipeSuscription = this.localStorageService.getRecipeObservable().subscribe(
      (newData) => {
        this.recipes = newData;
      }
    );
  }

  ngOnDestroy() {
    if (this.recipeSuscription) {
      this.recipeSuscription.unsubscribe();
    }
  }


  toggleFavorite(recipe: any): void {
    recipe.isFavorite = !recipe.isFavorite;
    if(recipe.isFavorite){
      console.log('agregando a favoritos!')
      this.localStorageService.updateData(
        this.localStorageService.getDataFromLocalStorage('favorites').concat(recipe),
        'favorites'
      );
      this.localStorageService.updateData(
        this.localStorageService.getDataFromLocalStorage('recipes').map((r: any) => r._id === recipe._id ? recipe : r),
        'recipes'
      );
    }
    else{
      this.localStorageService.updateData(
        this.localStorageService.getDataFromLocalStorage('favorites').filter((r: any) => r._id !== recipe._id),
        'favorites'
      );
      this.localStorageService.updateData(
        this.localStorageService.getDataFromLocalStorage('recipes').map((r: any) => r._id === recipe._id ? recipe : r),
        'recipes'
      );
    }
  }

  openRecipeDetail(recipe: RecipeModel): void {
    this.router.navigate(['recipes','recipe-details', recipe._id]);
  }

  openRecipeForm(recipe: RecipeModel): void {
    this.recipeService.openForm(recipe);
  }

  createNewRecipe(): void {
    this.recipeService.openForm(null);
  }

  receiveSearchTerm(event: string): void {
    if(event.length < 3){
      this.searchTerm = '';
      this.recipesResult = [];
    }
    else {
      this.searchTerm = event;
      this.recipesResult = this.searchService.searchRecipes(event, this.recipes);
    }
  }
}
