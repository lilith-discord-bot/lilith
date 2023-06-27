import { container } from "tsyringe";
import { Client } from "../../../../core/Client";
import { clientSymbol } from "../../../../utils/Constants";

export class Repository {
  /**
   * The client instance.
   * @type {Client}
   */
  readonly client: Client;

  constructor() {
    this.client = container.resolve(clientSymbol);
  }
}
