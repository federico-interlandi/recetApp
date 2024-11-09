import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { SharedModule } from '@shared/shared.module';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailsPageComponent } from './pages/recipe-details-page/recipe-details-page.component';
import { EditDeleteButtonsComponent } from './components/edit-delete-buttons/edit-delete-buttons.component';


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipeFormComponent,
    RecipeDetailsPageComponent,
    EditDeleteButtonsComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
