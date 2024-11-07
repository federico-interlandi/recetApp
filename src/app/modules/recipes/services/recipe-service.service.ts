import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RecipeModel } from '@core/models/recipe.model';
import { ErrorNotificationService } from '@shared/services/error-notification.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly URL = environment.api;
  private readonly localStorageKey = 'recipes';
  private recipesSubject = new BehaviorSubject<RecipeModel[]>(this.getRecipesFromLocalStorage() || []);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient, private errorNotificationService: ErrorNotificationService) { }

  getGlobalRecipes$(): Observable<RecipeModel[]> {
    if (this.recipesSubject.value.length > 0) {
      return this.recipes$;
    } else {
      return this.http.get<RecipeModel[]>(`${this.URL}/recipes`).pipe(
        tap(data => {
          this.saveRecipesToLocalStorage(data);
          this.recipesSubject.next(data);
        }),
        catchError((error: any) => {
          this.errorNotificationService.showError('Error al obtener recetas: ' + error.message);
          return this.recipes$;
        })
      );
    }
  }

  updateRecipeInLocalStorage(updatedRecipe: RecipeModel): void {
    const recipes = this.recipesSubject.value;
    const index = recipes.findIndex(recipe => recipe._id === updatedRecipe._id);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      this.saveRecipesToLocalStorage(recipes);
      this.recipesSubject.next(recipes);
    }
  }

  private getRecipesFromLocalStorage(): RecipeModel[] | null {
    const recipes = localStorage.getItem(this.localStorageKey);
    return recipes ? JSON.parse(recipes) : null;
  }

  private saveRecipesToLocalStorage(recipes: RecipeModel[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
  }
}
