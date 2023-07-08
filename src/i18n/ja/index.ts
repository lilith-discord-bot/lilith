import type { Translation } from "../i18n-types";

const jp = {
  settings: {
    locale: {
      SUCCESS: "サーバーのロケールが **{locale}** に更新されました。",
    },
    notifications: {
      NO_PERMISSIONS: "{channel} でメッセージを送信する権限がありません。",
      ALREADY_ENABLED: "**{event}** に対する通知は既に有効になっています。",
      ENABLED: "**{event}** の通知が有効になり、{channel} に送信されます。",
      NOT_ENABLED: "**{event}** に対する通知は有効になっていません。",
      UPDATED: "**{event}** の通知がアップデートされ、{channel} に送信されます。",
      DISABLED: "**{event}** の通知は無効になりました。",
      ALREADY_DISABLED: "**{event}** に対する通知は既に無効になっています。",
      NO_EVENTS: "有効なイベントはありません。",
      NO_EVENTS_IN_CHANNEL: "{channel} で有効になっているイベントはありません。",
      EVENTS_WORKING: "**{event}** の通知は機能しており、{channel} に送信されます。",
      REFRESHED: "**{event}** の通知が更新され、{channels} に送信されます。",
    },
  },
  armory: {
    BAD_FORMAT: "入力されたプレイヤーは無効です、次の形式である必要があります: `プレイヤー名#1234`。",
    PLAYER_NOT_FOUND:
      "プレイヤー **{player}** が見つかりません、名前を正しく入力したか、そのプレイヤーが存在するか確認してください。",
    NO_CHARACTERS: "プレイヤーにはキャラクターがいません。",
    NO_CHARACTER: "キャラクターが見つかりません。名前を正しく入力したか、少なくとも1文字が存在することを確認してください。",
    SELECT_CHARACTER: "armoryを取得するキャラクターを選択してください。",
    MULTIPLE_CHARACTERS: "このプレイヤーは複数のキャラクターを持っています。1つ選択してください。",
    PLAYER_CHOICE: "{name} ({characters} キャラクター)",
    NOT_TRACKED_YET: '"{player}" は現在追跡されていません、追跡するには送信してください。',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} が {zone} ({territory}) に {time} ({countdown}) 出現します。\n\n次回のボスは {nextTime} に {nextName} と予測されます。",
    HELLTIDE: "{time} まで {zone} でヘルタイドが発生、次回のヘルタイドは {nextTime}\n\nチェスト更新: {refresh}",
    LEGION: "レギオンは {time} に出現、次回のレギオンは {nextTime} に出現します。",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "統計",
      STATISTICS_VALUE:
        "ワールドティア: {worldTier}\nモンスターキル: {monstersKilled}\nエリートキル: {elitesKilled}\n獲得ゴールド: {goldCollected}",
      CHARACTER_CREATION_TITLE: "キャラクター作成",
      LAST_PLAYED_TITLE: "最後のプレイ",
      PLAYED_TIME_TITLE: "プレイ時間",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "ステータス",
      MODE_TITLE: "モード",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "{username} コマンド",
      DESCRIPTION: "これが私の全てのコマンドリストです。各コマンドに関する詳細情報を取得する機能を近々追加する予定です！",
    },
    INFO: {
      STATISTICS_TITLE: "統計",
      STATISTICS_VALUE: "サーバー: {servers}\nユーザー: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} はglazk0とMarcoによって開発されたDiablo 4に関する情報を提供するDiscordボットです。",
    },
    SETTINGS: {
      TITLE: "サーバーの通知設定",
      VALUE: "チャンネル: {channel}\nロール: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "無効なクエリです。",
    NO_DATE_FOUND: "データが見つかりません。",
    NO_PLAYED_TIME: "プレイ時間が見つかりません。",
    NO_EQUIPPED_ITEMS: "装備アイテムが見つかりません。",
  },
} satisfies Translation;

export default jp;
