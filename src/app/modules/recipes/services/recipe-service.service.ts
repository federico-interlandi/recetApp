import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { RecipeModel } from '@core/models/recipe.model';
import { ErrorNotificationService } from '@shared/services/error-notification.service';
import { environment } from 'src/environment/environment';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly URL = environment.api;
  private readonly recipesKey = 'recipes';
  private readonly favoritesKey = 'favorites';

  // private readonly recipesSubject = new BehaviorSubject<RecipeModel[]>(this.getRecipesFromLocalStorage(this.recipesKey) || []);
  // recipes$ = this.recipesSubject.asObservable();

  private readonly selectedRecipeSubject = new BehaviorSubject<RecipeModel | null>(null);
  selectedRecipe$ = this.selectedRecipeSubject.asObservable();

  private readonly openFormSubject = new BehaviorSubject<boolean>(false);
  openForm$ = this.openFormSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly errorNotificationService: ErrorNotificationService,
    private readonly localStorageService: LocalStorageService
    ) { }

  openForm(recipe: RecipeModel | null): void {
    this.selectedRecipeSubject.next(recipe);
    this.openFormSubject.next(true);
  }

  closeForm(): void {
    this.selectedRecipeSubject.next(null);
    this.openFormSubject.next(false);
  }

  populateRecipes$(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${this.URL}/recipes/get`).pipe(
      tap(data => {
        this.localStorageService.updateData(data, this.recipesKey);
      }),
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al poblar recetas: ' + error.message);
        throw error;
      }
      )
    );
  }

  addRecipe$(recipe: RecipeModel): Observable<RecipeModel[]> {
    return this.http.post<RecipeModel>(`${this.URL}/recipes/add`, recipe).pipe(
      switchMap(() => this.populateRecipes$()),
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al añadir receta: ' + error.message);
        return of({} as RecipeModel[]);
      })
    );
  }

  getRecipeById$(id: string): Observable<RecipeModel> {

    // should use get by id but api not allowed

    const recipe = this.localStorageService.getDataFromLocalStorage('recipes')
      .find((recipe: RecipeModel) => recipe._id === id);
    if(recipe) return of(recipe);
    else throw new Error('No se encontró la receta');
  }

  updateRecipe$(id: string, recipe: RecipeModel): Observable<RecipeModel[]> {
    return this.http.put<RecipeModel>(`${this.URL}/recipes/edit/${id}`, recipe).pipe(
      switchMap( () => this.populateRecipes$()),
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al actualizar receta: ' + error.message);
        return of({} as RecipeModel[]);
      })
    );
  }

  removeRecipe$(id: string): Observable<RecipeModel[]> {
    return this.http.delete<RecipeModel>(`${this.URL}/recipes/delete/${id}`).pipe(
      switchMap( () => this.populateRecipes$()),
      catchError((error: any) => {
        this.errorNotificationService.showError('Error al eliminar receta: ' + error.message);
        return of({} as RecipeModel[]);
      })
    );
  }

}
