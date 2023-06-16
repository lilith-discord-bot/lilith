import { Embed } from "./Embed";

import { Context } from "../../core/Interaction";

export class InfoEmbed extends Embed {
  constructor(data: any, ctx: Context) {
    super();

    this.data.author = {
      name: ctx.client.user!.username,
      icon_url: ctx.client.user!.displayAvatarURL(),
    };

    this.data.thumbnail = {
      url: ctx.client.user!.displayAvatarURL(),
    };

    this.data.description = `Lilith is a Discord bot that provides information about Diablo 4.`;

    this.data.fields = [
      {
        name: "Statistics",
        value: `Servers: ${data.guilds.toLocaleString("en-US")}\nUsers: ${data.users.toLocaleString("en-US")}`,
      },
      {
        name: "Debug",
        value: `Clusters: ${ctx.client.cluster.count}\nShards: ${ctx.client.cluster.info.TOTAL_SHARDS}\nShardID: ${data.shardId}\nClusterID: ${ctx.client.cluster.id}`,
      },
    ];
  }
}
