import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  constructor(private recipeService: RecipeService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if(this.localStorageService.getDataFromLocalStorage('recipes').length === 0){
     this.recipeService.populateRecipes$().subscribe({});
    }
  }

}
