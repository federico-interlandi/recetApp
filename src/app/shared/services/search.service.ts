import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { RecipeModel } from '@core/models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly localStorageService: LocalStorageService) { }

  searchRecipes(term: string, data: RecipeModel[]): RecipeModel[]{
    // return this.localStorageService.getDataFromLocalStorage('recipes')
    //   .filter( (recipe: RecipeModel) =>
    //     recipe.name.toLowerCase().includes(term.toLowerCase())
    // )
    return data.filter( (recipe: RecipeModel) =>
      recipe.name.toLowerCase().includes(term.toLowerCase()))
  }
}
