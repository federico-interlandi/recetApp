import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';
import { ModalService } from '@shared/services/warning-modal.service';

@Component({
  selector: 'app-edit-delete-button',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrl: './edit-delete-buttons.component.css'
})
export class EditDeleteButtonsComponent {

  @Input() selectedRecipe: RecipeModel | null = null;
  @Input() inDetailsPage = false;

  showDeleteWarning = false;

  constructor(private readonly recipeService: RecipeService,
     private readonly router: Router,
    private warningModalService: ModalService) { }

  openRecipeForm(recipe: RecipeModel): void {
    this.recipeService.openForm(recipe);
  }

  openDeleteWarning(): void {
    this.warningModalService.openModal(
      '¿Estás seguro de que deseas borrar esta receta?',
      () => this.confirmDelete()
    );
  }

  closeDeleteWarning(): void {
    this.showDeleteWarning = false;
  }

  confirmDelete(): void {
    if (this.selectedRecipe?._id) {
      this.deleteRecipe(this.selectedRecipe._id);
      this.closeDeleteWarning();
    }
  }

  private deleteRecipe(id: string): void {
    this.recipeService.removeRecipe$(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al borrar receta:', err);
      }
    });
  }
}
