import type { Translation } from "../i18n-types";

const it = {
  settings: {
    locale: {
      SUCCESS: "La lingua è stata impostata su **{locale}** per questo server Discord.",
    },
    notifications: {
      NO_PERMISSIONS: "Non ho i permessi per inviare messaggi nel canale {channel}.",
      ALREADY_ENABLED: "Le notifiche per l'evento **{event}** sono già attive.",
      ENABLED: "Le notifiche per l'evento **{event}** sono state attivate e verranno inviate nel canale {channel}.",
      NOT_ENABLED: "Non sono state attivate le notifiche per l'evento **{event}**.",
      UPDATED: "Le notifiche per l'evento **{event}** sono state aggiornate e verranno inviate nel canale {channel}.",
      DISABLED: "Le notifiche per l'evento **{event}** sono state disattivate.",
      ALREADY_DISABLED: "Le notifiche per l'evento **{event}** sono già disattive.",
      NO_EVENTS: "Non ci sono eventi attivi.",
      NO_EVENTS_IN_CHANNEL: "Non ci sono eventi attivi per il canale {channel}.",
      EVENTS_WORKING: "Le notifiche per l'evento **{event}** sono funzionanti e verranno inviate nel canale {channel}.",
      REFRESHED: "Le notifiche per l'evento **{event}** sono state rigenerate e verranno inviate nel canale {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "Il giocatore indicato non può essere verificato, deve corrispondere al seguente formato: `Player#1234`.",
    PLAYER_NOT_FOUND:
      "Non è stato possibile verificare il giocatore **{player}**, assicurati di averlo scritto correttamente o che esista.",
    NO_CHARACTERS: "Non sono presenti personaggi associati al giocatore.",
    NO_CHARACTER:
      "Nessun personaggio presente, assicurati di aver scritto il nome correttamente o che sia esista almeno un personaggio associato.",
    SELECT_CHARACTER: "Seleziona un personaggio per cui ottenere l'armeria.",
    MULTIPLE_CHARACTERS: "Sono presenti più personaggi associati al giocatore. Selezionane uno.",
    PLAYER_CHOICE: "{name} ({characters} characters)",
    NOT_TRACKED_YET: '"{player}" non è attualmente monitorato, invia per monitorarlo.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} apparirà in {zone} ({territory}) alle ore {time} ({countdown}).\n\nIl prossimo boss sarà {nextName} alle ore {nextTime}",
    HELLTIDE:
      "La Marea Infernale si manifesterà a {zone} alle ore {time}, la prossima Marea Infernale avverrà alle ore {nextTime}\n\nRigenerazione scrigni: {refresh}",
    LEGION: "La Legione apparirà alle ore {time}, la prossima Legione apparirà alle ore {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statistiche",
      STATISTICS_VALUE:
        "Livello del mondo: {worldTier}\nMostri uccisi: {monstersKilled}\nElitè eliminati: {elitesKilled}\nOro accumulato: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Creazione personaggio",
      LAST_PLAYED_TITLE: "Ultimo accesso",
      PLAYED_TIME_TITLE: "Tempo di gioco",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Stato",
      MODE_TITLE: "Modalità",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Comandi di {username}",
      DESCRIPTION:
        "Di seguito una lista di tutti i miei comandi. Aggiungeremo presto la possibilità di avere ulteriori informazioni su ogni comando presente!",
    },
    INFO: {
      STATISTICS_TITLE: "Statistiche",
      STATISTICS_VALUE: "Servers: {servers}\nUtenti: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} è un bot di Discord che fornisce informazioni su Diablo 4 sviluppato da glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Le impostazioni sulle notifiche del tuo server Discord",
      VALUE: "Canale: {channel}\nRuolo: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Query non valida.",
    NO_DATE_FOUND: "Impossibile recuperare la data.",
    NO_PLAYED_TIME: "Impossibile recuperare il tempo di gioco.",
    NO_EQUIPPED_ITEMS: "Nessun oggetto equipaggiato trovato.",
  },
} satisfies Translation;

export default it;
