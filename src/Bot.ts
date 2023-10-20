import { ActivityType, GatewayIntentBits, Options, Partials } from "discord.js";
import { getInfo } from "discord-hybrid-sharding";

import { Client } from "./structures/Client";

const client = new Client({
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    ApplicationCommandManager: 0,
    AutoModerationRuleManager: 0,
    BaseGuildEmojiManager: 0,
    GuildBanManager: 0,
    GuildEmojiManager: 0,
    GuildForumThreadManager: 0,
    GuildInviteManager: 0,
    GuildMemberManager: {
      maxSize: 1,
      keepOverLimit: (member) => member.id === member.client.user.id,
    },
    GuildStickerManager: 0,
    GuildTextThreadManager: 0,
    MessageManager: 0,
    PresenceManager: 0,
    ReactionManager: 0,
    ReactionUserManager: 0,
    StageInstanceManager: 0,
    ThreadManager: 0,
    ThreadMemberManager: 0,
    UserManager: 0,
    VoiceStateManager: 0,
  }),
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
  presence: {
    status: "online",
    activities: [
      {
        name: "hell",
        type: ActivityType.Watching,
      },
    ],
  },
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,
});

client.init();
