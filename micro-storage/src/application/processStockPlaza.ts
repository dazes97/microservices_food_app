import { IPlazaRepository } from "@domain/repositories/IPlazaRepository.js";
import { Plaza } from "@domain/entities/Plaza.js";

export class ProcessStockPlaza {
  constructor(private plazaRepository: IPlazaRepository) {}
  async execute(): Promise<Plaza[]> {
    return await this.plazaRepository.getHistory();
  }
}
