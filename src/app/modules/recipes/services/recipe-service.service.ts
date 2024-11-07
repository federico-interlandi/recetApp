import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RecipeModel } from '@core/models/recipe.model';
import { ErrorNotificationService } from '@shared/services/error-notification.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly URL = environment.api;
  private readonly recipesKey = 'recipes';
  private readonly favoritesKey = 'favorites';
  private recipesSubject = new BehaviorSubject<RecipeModel[]>(this.getRecipesFromLocalStorage(this.recipesKey) || []);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient, private errorNotificationService: ErrorNotificationService) { }

  getRecipes$(refresh?: boolean): Observable<RecipeModel[]> {
    if (this.recipesSubject.value.length > 0 && !refresh) {
      return this.recipes$;
    } else {
      return this.http.get<RecipeModel[]>(`${this.URL}/recipes/get`).pipe(
        tap(data => {
          this.saveRecipesToLocalStorage(data, this.recipesKey);
          this.recipesSubject.next(data);
        }),
        catchError((error: any) => {
          this.errorNotificationService.showError('Error al obtener recetas: ' + error.message);
          return this.recipes$;
        })
      );
    }
  }

  updateRecipe$(id: string, recipe: RecipeModel): Observable<RecipeModel> {
    return this.http.put<RecipeModel>(`${this.URL}/recipes/edit/${id}`, recipe).pipe(
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al actualizar receta: ' + error.message);
        return of({} as RecipeModel);
      })
    );
  }

  removeRecipe$(id: string): Observable<RecipeModel> {
    return this.http.delete<RecipeModel>(`${this.URL}/recipes/delete/${id}`).pipe(
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al eliminar receta: ' + error.message);
        return of({} as RecipeModel);
      })
    );
  }


  updateRecipeInLocalStorage(updatedRecipe: RecipeModel): void {
    const recipes = this.recipesSubject.value;
    const index = recipes.findIndex(recipe => recipe._id === updatedRecipe._id);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      this.saveRecipesToLocalStorage(recipes, this.recipesKey);
      this.recipesSubject.next(recipes);
    }
  }

  private getRecipesFromLocalStorage(key: string): RecipeModel[] | null {
    const recipes = localStorage.getItem(key);
    return recipes ? JSON.parse(recipes) : null;
  }

  private saveRecipesToLocalStorage(recipes: RecipeModel[], key: string): void {
    localStorage.setItem(key, JSON.stringify(recipes));
  }

  addToFavorites(recipe: RecipeModel): void {
    const favorites = this.getRecipesFromLocalStorage(this.favoritesKey);
    if (favorites) {
      favorites.push(recipe);
      this.saveRecipesToLocalStorage(favorites, this.favoritesKey);
    } else {
      this.saveRecipesToLocalStorage([recipe], this.favoritesKey);
    }
  }

  removeFromFavorites(recipe: RecipeModel): void {
    const favorites = this.getRecipesFromLocalStorage(this.favoritesKey);
    if (favorites) {
      const index = favorites.findIndex(favorite => favorite._id === recipe._id);
      if (index !== -1) {
        favorites.splice(index, 1);
        this.saveRecipesToLocalStorage(favorites, this.favoritesKey);
      }
    }
  }

}
