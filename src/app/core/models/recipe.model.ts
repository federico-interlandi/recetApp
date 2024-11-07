import { BaseModel } from "./base.model"
import { IngredientModel } from "./ingredient.model"

export interface RecipeModel extends BaseModel {
  name: string
  description: string
  ingredients: IngredientModel[]
  userEmail: string,
  imagePath: string,
  isFavorite?: boolean
}
