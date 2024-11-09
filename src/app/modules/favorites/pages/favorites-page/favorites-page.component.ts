import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {

  favoritesSuscription: Subscription = new Subscription();
  favorites: RecipeModel[] = [];

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.favoritesSuscription = this.localStorageService.getFavoriteObservable().subscribe(
      (newData) => {
        this.favorites = newData;
      }
    );
  }

  openRecipeDetail(recipe: RecipeModel): void {
    this.router.navigate(['recipes','recipe-details', recipe._id]);
  }

  removeFromFavorites(recipe: RecipeModel): void {
    recipe.isFavorite = false;
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
