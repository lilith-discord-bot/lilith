import { container } from "tsyringe";
import { Client } from "../../../../structures/Client";
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
