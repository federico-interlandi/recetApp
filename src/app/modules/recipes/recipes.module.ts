import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { SharedModule } from '@shared/shared.module';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
