import { Embed } from "./Embed";

import { Context } from "../core/Interaction";

export class InfoEmbed extends Embed {
  constructor(data: any) {
    super();

    this.data.author = {
      name: this.client.user!.username,
      icon_url: this.client.user!.displayAvatarURL(),
    };

    this.data.thumbnail = {
      url: this.client.user!.displayAvatarURL(),
    };

    this.data.description = `${this.client.user.username} is a Discord bot that provides information about Diablo 4. World Discord bot developed by glazk0 & Marco.`;

    this.data.fields = [
      {
        name: "Statistics",
        value: `Servers: ${data.guilds.toLocaleString("en-US")}\nUsers: ${data.users.toLocaleString("en-US")}`,
      },
      {
        name: "Debug",
        value: `Clusters: ${this.client.cluster.count}\nShards: ${this.client.cluster.info.TOTAL_SHARDS}\nShardID: ${data.shardId}\nClusterID: ${this.client.cluster.id}`,
      },
    ];
  }
}
