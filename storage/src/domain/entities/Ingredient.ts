export class Ingredient {
  constructor(public name: string, public quantity: number) {}

  isAvailable(requiredQuantity: number): boolean {
    return this.quantity >= requiredQuantity;
  }
}
