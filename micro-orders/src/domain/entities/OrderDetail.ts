export class OrderDetail {
  constructor(
    public id: number,
    public recipeName: string,
    public recipeId: number,
    public createdAt: Date,
    public history: {
      createdAt: Date;
      status: string;
    }[]
  ) {}
}
