import { Context } from "../core/Interaction";
import { Embed } from "./Embed";

import { Event } from "@prisma/client";

export class SettingsEmbed extends Embed {
  constructor(events: Event[], { i18n }: Context) {
    super();

    this.data.title = i18n.embeds.SETTINGS.TITLE();

    this.data.fields = events.map((event) => ({
      name: event.type,
      value: i18n.embeds.SETTINGS.VALUE({
        channel: event.channelId ? `<#${event.channelId}>` : "/",
        role: event.roleId ? `<@&${event.roleId}>` : "/",
      }),
      inline: false,
    }));
  }
}
