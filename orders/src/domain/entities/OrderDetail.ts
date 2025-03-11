export class OrderDetail {
  constructor(
    public id: number,
    public recipeId: number,
    public createdAt: Date,
    public history: {
      createdAt: Date;
      status: string;
    }[]
  ) {}
}
