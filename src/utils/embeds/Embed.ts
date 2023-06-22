import { APIEmbedField, EmbedBuilder } from "discord.js";
import { Client } from "../../core/Client";
import { container } from "tsyringe";
import { clientSymbol } from "../Constants";

export class Embed extends EmbedBuilder {
  /**
   * The client instance.
   */
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
