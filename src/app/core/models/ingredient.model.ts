import { BaseModel } from "./base.model";

export interface IngredientModel extends BaseModel {
  name: string,
  amount: number
}
