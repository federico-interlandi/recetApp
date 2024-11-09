import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit , OnDestroy {
  recipe: RecipeModel | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    readonly recipeService: RecipeService,
    private route : ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    const recipeSubscription = combineLatest([
      this.localStorageService.getRecipeObservable(),
      this.route.paramMap
    ]).subscribe(([recipes, params]) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.recipe = recipes.find(recipe => recipe._id === recipeId) || null;
      }
    });

    this.subscriptions.add(recipeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadRecipe(id: string): void {
    this.recipeService.getRecipeById$(id).subscribe({
      next: (data) => {
        this.recipe = data;
      },
      error: (err) => {
        console.error('Error al cargar recetas:', err);
      }
    });
  }

}
