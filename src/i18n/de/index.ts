import type { Translation } from "../i18n-types";

const de = {
  settings: {
    locale: {
      SUCCESS: "Die Spracheinstellungen für Lilith wurden auf folgende Einstellungen aktualisiert: **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "{username} hat keine Berechtigung zum Senden von Nachrichten in diesem {channel}.",
      ALREADY_ENABLED: "Benachrichtigungen für **{event}** sind bereits aktiviert.",
      ENABLED: "Benachrichtigungen für **{event}** wurden aktiviert und werden in {channel} veröffentlicht.",
      NOT_ENABLED: "Benachrichtigungen für **{event}** sind nicht aktiviert.",
      UPDATED: "Benachrichtigungen für **{event}** wurden aktualisiert und werden in {channel} veröffentlicht.",
      DISABLED: "Benachrichtigungen für **{event}** wurden deaktiviert.",
      ALREADY_DISABLED: "Benachrichtigungen für **{event}** sind bereits deaktiviert.",
      NO_EVENTS: "Es wurden keinen Benachrichtigungen für Ereignisse aktiviert.",
      NO_EVENTS_IN_CHANNEL: "In {channel} wurden keine Ereignisse aktiviert.",
      EVENTS_WORKING: "Benachrichtigungen für **{event}** funktionieren und werden in {channel} veröffentlicht.",
      REFRESHED: "Benachrichtigungen für **{event}** wurden aktualisiert und werden hier veröffentlicht: {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "Das angegebene BattleTag ist nicht gültig, es muss das folgende Format haben: `BattleTag#1234`.",
    PLAYER_NOT_FOUND:
      "Das BattleTag **{player}** wurde nicht gefunden, bitte die Schreibweise überprüfen bzw. ob es vorhanden ist.",
    NO_CHARACTERS: "Das BattleTag hat keine Charaktere.",
    NO_CHARACTER: "Es wurden keinen Charakter gefunden, bitte die Schreibweise überprüfen bzw. ob es vorhanden ist.",
    SELECT_CHARACTER: "Bitte einen Charakter auswählen, dessen Profil angezeigt werden soll.",
    MULTIPLE_CHARACTERS: "Dieser BattleTag hat mehrere Charaktere. Bitte einen auswählen.",
    PLAYER_CHOICE: "{name} ({characters} Charaktere)",
    NOT_TRACKED_YET: '"{player}" ist aktuell nicht in der Datenbank vorhanden, bestätigen zum Hinzufügen.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} erscheint in {zone} ({territory}) um {time} Uhr ({countdown}).\n\nDanach wird wahrscheinlich {nextName} um etwa {nextTime} Uhr erscheinen.",
    HELLTIDE:
      "Die Höllenflut erscheint in {zone} bis {time} Uhr. Die nächste Höllenflut erscheint um {nextTime} Uhr.\n\nStandortaktualisierung der Truhen: {refresh}.",
    LEGION: "Standortaktualisierung der Legion: {time}, die nächste Legion erscheint danach um {nextTime} Uhr.",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statistik",
      STATISTICS_VALUE:
        "Weltstufe: {worldTier}\nMonster getötet: {monstersKilled}\nElitemonster getötet: {elitesKilled}\nGold aufgesammelt: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Charaktererstellung",
      LAST_PLAYED_TITLE: "Zuletzt gespielt",
      PLAYED_TIME_TITLE: "Spielzeit",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Status",
      MODE_TITLE: "Modus",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Befehle für {username}",
      DESCRIPTION:
        "Hier eine Liste der Befehle. Es wird bald eine Möglichkeit geben, Informationen zu den einzelnen Befehlen zu erhalten!",
    },
    INFO: {
      STATISTICS_TITLE: "Statistik",
      STATISTICS_VALUE: "Server: {servers}\nNutzer: {users}",
      DEBUG_TITLE: "Debug-Informationen",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION:
        "{username} ist ein Discord-Bot, der Informationen über Diablo 4 liefert - entwickelt von glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Die Benachrichtungseinstellungen dieses Server",
      VALUE: "Kanal: {channel}\nRolle: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Ungültige Anfrage.",
    NO_DATE_FOUND: "Kein Datum gefunden.",
    NO_PLAYED_TIME: "Keine Spielzeit gefunden.",
    NO_EQUIPPED_ITEMS: "Keine angelegten Gegenstände gefunden.",
  },
} satisfies Translation;

export default de;
