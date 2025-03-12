export class PlazaClient {
  async buyIngredient(name: string) {
    console.log(`Buying ${name} en in the store...`);
    const quantitySold =
      Math.random() > 0.3 ? Math.trunc(Math.random() * 5) : 0;
    return { name, quantitySold };
  }
}
