import { EmbedBuilder } from "discord.js";
import { container } from "tsyringe";

import { Client } from "../core/Client";

import { clientSymbol } from "../utils/Constants";

export class Embed extends EmbedBuilder {
  public readonly client: Client;
  /**
   * The embed fields.
   * @type {APIEmbedField[]}
   */
  constructor() {
    super();

    this.client = container.resolve<Client>(clientSymbol);

    this.data.color = 0xa50905;
  }
}
