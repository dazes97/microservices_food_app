export class Plaza {
  constructor(
    private id: number,
    private orderId: number,
    private quantity: number,
    private ingredientName: string,
    private createdAt: Date
  ) {}
}
