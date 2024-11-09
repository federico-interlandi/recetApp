import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionGuard } from '@core/guards/session.guard';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () => import('@modules/recipes/recipes.module').then(m => m.RecipesModule),
    canActivate: [sessionGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.module').then(m => m.FavoritesModule),
    canActivate: [sessionGuard]
  },
  {
    path: '**',
    redirectTo: '/recipes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
