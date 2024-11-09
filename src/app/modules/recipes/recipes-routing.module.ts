import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipeDetailsPageComponent } from './pages/recipe-details-page/recipe-details-page.component';
import { sessionGuard } from '@core/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    component: RecipesPageComponent,
    // outlet: "child"
  },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsPageComponent,
    canActivate: [sessionGuard]
    // outlet: "recipeDetails"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
