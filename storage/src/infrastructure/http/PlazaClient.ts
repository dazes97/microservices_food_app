export class PlazaClient {
  async buyIngredient(name: string) {
    console.log(`Comprando ${name} en la Plaza...`);
    const quantitySold =
      Math.random() > 0.1 ? Math.trunc(Math.random() * 5) : 0;
    return { name, quantitySold };
  }
}
