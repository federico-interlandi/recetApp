import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() recipe!: RecipeModel;
  @Output() save = new EventEmitter<RecipeModel>();
  @Output() close = new EventEmitter<void>();

  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.recipe) {
      this.recipeForm.patchValue(this.recipe);
    }
  }

  onSave(): void {
    if (this.recipeForm.valid) {
      this.save.emit({_id: this.recipe?._id, ...this.recipeForm.value});
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
