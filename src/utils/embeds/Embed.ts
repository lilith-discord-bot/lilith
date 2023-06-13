import { APIEmbedField, EmbedBuilder } from 'discord.js';

export class Embed extends EmbedBuilder {
  /**
   * The embed fields.
   * @type {APIEmbedField[]}
   */
  constructor() {
    super();
    this.data.color = 0xa50905;
  }
}
