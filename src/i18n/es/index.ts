import type { BaseTranslation, Translation } from "../i18n-types";
const es = {
  settings: {
    locale: {
      SUCCESS: "La configuración regional de tu servidor de Discord se ha actualizado a **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "No tengo permisos para enviar mensajes en {channel}.",
      ALREADY_ENABLED: "Las notificaciones para {event} ya están activadas.",
      ENABLED: "Se han activado las notificaciones para {event} y se enviarán a {channel}.",
      NOT_ENABLED: "Las notificaciones para {event} no están activadas.",
      UPDATED: "Se han actualizado las notificaciones para {event} y se enviarán a {channel}.",
      DISABLED: "Se han desactivado las notificaciones para {event}.",
      ALREADY_DISABLED: "Las notificaciones para {event} ya están desactivadas.",
      NO_EVENTS: "No hay eventos activados.",
      NO_EVENTS_IN_CHANNEL: "No hay eventos activados en {channel}.",
      EVENTS_WORKING: "Las notificaciones para {event} están funcionando y se enviarán a {channel}.",
      REFRESHED: "Se han actualizado las notificaciones para {event} y se enviarán a {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "El jugador que proporcionaste no es válido, debe estar en el siguiente formato: Jugador#1234.",
    PLAYER_NOT_FOUND:
      "No pude encontrar al jugador {player}, asegúrate de haber escrito correctamente el nombre o de que el jugador exista.",
    NO_CHARACTERS: "El jugador no tiene ningún personaje.",
    NO_CHARACTER:
      "No se encontró ningún personaje, asegúrate de haber escrito correctamente el nombre o de que al menos exista un personaje.",
    SELECT_CHARACTER: "Selecciona un personaje para obtener el armamento.",
    MULTIPLE_CHARACTERS: "Este jugador tiene varios personajes. Por favor, selecciona uno.",
    PLAYER_CHOICE: "{name} ({characters} personajes)",
    NOT_TRACKED_YET: '"{player}" no está siendo rastreado actualmente, envía para comenzar a rastrearlo.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} aparece en {zone} ({territory}) a las {time} ({countdown}).\n\nEl próximo jefe esperado es {nextName} a las {nextTime}",
    HELLTIDE:
      "Helltide ocurriendo en {zone} hasta las {time}, próximo Helltide a las {nextTime}\n\nActualización de cofres: {refresh}",
    LEGION: "Legion aparece a las {time}, próximo Legion a las {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Estadísticas",
      STATISTICS_VALUE:
        "Nivel Mundial: {worldTier}\nMonstruos eliminados: {monstersKilled}\nÉlites eliminadas: {elitesKilled}\nOro recolectado: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Creación de personaje",
      LAST_PLAYED_TITLE: "Última partida",
      PLAYED_TIME_TITLE: "Tiempo de juego",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Estado",
      MODE_TITLE: "Modo",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Comandos de {username}",
      DESCRIPTION:
        "Aquí tienes una lista de todos mis comandos. ¡Pronto agregaremos la capacidad de obtener más información sobre cada comando!",
    },
    INFO: {
      STATISTICS_TITLE: "Estadísticas",
      STATISTICS_VALUE: "Servidores: {servers}\nUsuarios: {users}",
      DEBUG_TITLE: "Depuración",
      DEBUG_VALUE: "Clusters: {clusters}\nFragmentos: {shards}\nID de fragmento: {shardId}\nID de clúster: {clusterId}",
      DESCRIPTION:
        "{username} es un bot de Discord que proporciona información sobre Diablo 4 desarrollado por glazk0 y Marco.",
    },
    SETTINGS: {
      TITLE: "Configuración de notificaciones de tu servidor",
      VALUE: "Canal: {channel}\nRol: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Consulta inválida.",
    NO_DATE_FOUND: "No se encontró fecha.",
    NO_PLAYED_TIME: "No se encontró tiempo de juego.",
    NO_EQUIPPED_ITEMS: "No se encontraron objetos equipados.",
  },
} satisfies Translation;

export default es;
