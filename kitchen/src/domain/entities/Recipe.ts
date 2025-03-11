export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public ingredients: { id: number; quantity: number }[],
    public createdAt: Date
  ) {}
}
