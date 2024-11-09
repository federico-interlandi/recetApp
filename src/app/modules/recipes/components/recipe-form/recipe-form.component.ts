import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '@modules/recipes/services/recipe-service.service';
import { Router } from '@angular/router';
import { IngredientModel } from '@core/models/ingredient.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  @Input() recipe: RecipeModel | null = null;
  @Output() close = new EventEmitter<void>();

  recipeForm: FormGroup;
  isNewRecipe = false;

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
      imagePath: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.recipe) {
      this.recipeForm.patchValue(this.recipe);
      this.setIngredients(this.recipe.ingredients);
      this.isNewRecipe = false;
    }
    else {
      this.isNewRecipe = true;
      this.recipeForm.reset();
      this.setIngredients([]);
    }
  }

  onSave(): void {
    if(!this.isNewRecipe) this.updateRecipe({_id: this.recipe?._id, ...this.recipeForm.value});
    else {
      this.recipeService.addRecipe$(this.recipeForm.value).subscribe({
        next: (data) => {
          this.recipeService.closeForm();
        },
        error: (err) => {
          console.error('Error al guardar receta:', err);
        }
      });
    }

  }

  onClose(): void {
    this.close.emit();
  }

  private updateRecipe(updatedRecipe: RecipeModel): void {
    if(updatedRecipe._id) this.recipeService.updateRecipe$(updatedRecipe._id, updatedRecipe).subscribe({
      next: (data) => {
        this.recipeService.closeForm();
      },
      error: (err) => {
        console.error('Error al actualizar receta:', err);
      }
     })
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  private setIngredients(ingredients: IngredientModel[]): void {
    const ingredientFGs = ingredients.map(ingredient => this.fb.group({
      name: [ingredient.name, Validators.required],
      amount: [ingredient.amount, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]]
    }));
    const ingredientFormArray = this.fb.array(ingredientFGs);
    this.recipeForm.setControl('ingredients', ingredientFormArray);
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({ name: '', amount: '' }));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
}

