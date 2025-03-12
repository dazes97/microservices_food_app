export class Ingredient {
  constructor(public id:number, public name: string, public quantity: number) {}

  isAvailable(requiredQuantity: number): boolean {
    return this.quantity >= requiredQuantity;
  }
}
