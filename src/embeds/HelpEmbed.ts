import { Collection } from "discord.js";

import { Embed } from "./Embed";

import { Interaction } from "../core/Interaction";

export class HelpEmbed extends Embed {
  constructor(commands: Collection<string, Interaction>) {
    super();

    const categories = [...new Set(commands.map((command) => command.category))];

    this.data.author = {
      name: `${this.client.user.username}'s Commands`,
      icon_url: this.client.user?.displayAvatarURL(),
    };

    this.data.description = `Here's a list of all my commands. We'll be adding the ability to get more information about each command soon!`;

    for (const category of categories) {
      const commandsInCategory = commands.filter((command) => command.category === category);
      this.addFields({
        name: category,
        value: commandsInCategory.map((command) => `\`${command.command.name}\``).join(", "),
      });
    }
  }
}
