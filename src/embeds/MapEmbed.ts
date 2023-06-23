import { Embed } from "./Embed";

import { MAP_URL } from "../utils/Constants";

export class MapEmbed extends Embed {
  constructor(name: string, description: string, coords: string) {
    super();

    this.data.title = name;

    this.data.description = description;

    this.data.url = `${MAP_URL}/nodes/${coords}?ref=glazk0`;

    this.data.image = {
      url: `${MAP_URL}/nodes/${coords}/screenshot?ref=glazk0`,
    };
  }
}
