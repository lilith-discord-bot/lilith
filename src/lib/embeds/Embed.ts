import { APIEmbedField, EmbedBuilder, RestOrArray } from 'discord.js';

export class Embed extends EmbedBuilder {
  /**
   * The embed fields.
   * @type {APIEmbedField[]}
   *
   * TODO : Think about default value
   */
  constructor() {
    super();
  }
}
