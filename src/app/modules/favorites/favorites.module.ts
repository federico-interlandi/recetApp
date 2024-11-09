import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SharedModule } from '@shared/shared.module';
import { RecipesModule } from '@modules/recipes/recipes.module';


@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    RecipesModule
  ]
})
export class FavoritesModule { }
