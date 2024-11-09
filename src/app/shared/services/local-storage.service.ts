import { Injectable } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private recipesSubject: BehaviorSubject<any>;
  private favoriteSubject: BehaviorSubject<any>;

  constructor() {
    const initialRecipes = this.getDataFromLocalStorage('recipes');
    const initialFavorites = this.getDataFromLocalStorage('favorites');
    this.recipesSubject = new BehaviorSubject<RecipeModel[]>(initialRecipes);
    this.favoriteSubject = new BehaviorSubject<RecipeModel[]>(initialFavorites);
    window.addEventListener('storage', () => this.onLocalStorageChange());
  }

  getDataFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private onLocalStorageChange() {
    const updatedRecipes = this.getDataFromLocalStorage('recipes');
    this.recipesSubject.next(updatedRecipes);
    const updatedFavorites = this.getDataFromLocalStorage('favorites');
    console.log('updatedFavorites', updatedFavorites);
    this.favoriteSubject.next(updatedFavorites);

  }

  getRecipeObservable(): Observable<RecipeModel[]> {
    return this.recipesSubject.asObservable();
  }

  getFavoriteObservable(): Observable<RecipeModel[]> {
    return this.favoriteSubject.asObservable();
  }

  updateData(data: any, key:string) {
    localStorage.setItem(key, JSON.stringify(data));
    if (key === 'recipes') {
      this.recipesSubject.next(data);
    } else if (key === 'favorites') {
      this.favoriteSubject.next(data);
    }
  }
}
