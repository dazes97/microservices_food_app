export class Order {
  constructor(
    public id: number,
    public recipeId: number,
    public createdAt: Date
  ) {}
}
