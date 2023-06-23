import { Embed } from "./Embed";

import { Context } from "../core/Interaction";

export class InfoEmbed extends Embed {
  constructor(data: any, { i18n }: Context) {
    super();

    this.data.author = {
      name: this.client.user!.username,
      icon_url: this.client.user!.displayAvatarURL(),
    };

    this.data.thumbnail = {
      url: this.client.user!.displayAvatarURL(),
    };

    this.data.description = i18n.embeds.INFO.DESCRIPTION({ username: this.client.user?.username });

    this.data.fields = [
      {
        name: i18n.embeds.INFO.STATISTICS_TITLE(),
        value: i18n.embeds.INFO.STATISTICS_VALUE({
          servers: data.guilds.toLocaleString("en-US"),
          users: data.users.toLocaleString("en-US"),
        }),
      },
      {
        name: i18n.embeds.INFO.DEBUG_TITLE(),
        value: i18n.embeds.INFO.DEBUG_VALUE({
          clusters: this.client.cluster.count,
          shards: this.client.cluster.info.TOTAL_SHARDS,
          shardId: data.shardId,
          clusterId: this.client.cluster.id,
        }),
      },
    ];
  }
}
