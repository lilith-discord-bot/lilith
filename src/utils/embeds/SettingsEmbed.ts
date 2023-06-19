import { Embed } from "./Embed";

import { Event } from "@prisma/client";

export class SettingsEmbed extends Embed {
  constructor(events: Event[]) {
    super();

    this.data.title = "Notification Settings";

    this.data.fields = events.map((event) => ({
      name: event.type,
      value: `Channel: <#${event.channelId}>\nRole: ${event.roleId ? `<@&${event.roleId}>` : "None"}`,
      inline: true,
    }));
  }
}
