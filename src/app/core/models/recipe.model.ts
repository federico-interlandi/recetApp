import { BaseModel } from "./base.model"
import { IngredientModel } from "./ingredient.model"

export interface RecipeModel extends BaseModel {
  title: string
  description: string
  ingredients: IngredientModel[]
  userEmail: string
}
