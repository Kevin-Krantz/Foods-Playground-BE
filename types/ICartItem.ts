import { IFood } from "./IFood";

export interface ICartItem extends IFood {
  quantity: number;
}
