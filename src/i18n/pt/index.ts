import type { Translation } from "../i18n-types";

const br = {
  settings: {
    locale: {
      SUCCESS: "A localização do seu servidor Discord foi atualizada para **{locale}**!",
    },
    notifications: {
      NO_PERMISSIONS: "Eu não tenho permissões para enviar mensagens em {channel}!",
      ALREADY_ENABLED: "As notificações para **{event}** já estão ativadas!",
      ENABLED: "As notificações para **{event}** foram ativadas e serão enviadas para {channel}!",
      NOT_ENABLED: "As notificações para **{event}** não estão ativadas!",
      UPDATED: "As notificações para **{event}** foram atualizadas e serão enviadas para {channel}!",
      DISABLED: "As notificações para **{event}** foram desativadas!",
      ALREADY_DISABLED: "As notificações para **{event}** já estão desativadas!",
      NO_EVENTS: "Não há eventos ativados!",
      NO_EVENTS_IN_CHANNEL: "Não há eventos ativados em {channel}!",
      EVENTS_WORKING: "As notificações para **{event}** estão funcionando e serão enviadas para {channel}!",
      REFRESHED: "Notifications for **{event}** have been refreshed and will be sent to {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "O jogador que você forneceu não é válido, ele precisa estar no seguinte formato: `Jogador#1234`!",
    PLAYER_NOT_FOUND:
      "Não consegui encontrar o jogador **{player}**, verifique se você digitou o nome corretamente ou se o jogador existe!",
    NO_CHARACTERS: "O jogador não possui nenhum personagem!",
    NO_CHARACTER:
      "Nenhum personagem encontrado, verifique se você digitou o nome corretamente ou se pelo menos um personagem existe!",
    SELECT_CHARACTER: "Selecione um personagem para obter o armory!",
    MULTIPLE_CHARACTERS: "Esse jogador possui vários personagens! Por favor, selecione um!",
    PLAYER_CHOICE: "{name} ({characters} personagens)",
    NOT_TRACKED_YET: '"{player}" não está sendo rastreado no momento, envie para rastreá-lo!',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} aparece em {zone} ({territory}) às {time} ({countdown}).\n\nO próximo chefe esperado é {nextName} às {nextTime}",
    HELLTIDE: "Helltide ocorrendo em {zone} até {time}, próximo helltide em {nextTime}\n\nAtualização dos baús: {refresh}",
    LEGION: "Legion aparece {time}, próxima legião às {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Estatísticas",
      STATISTICS_VALUE:
        "Nível Mundial: {worldTier}\nMonstros mortos: {monstersKilled}\nElites mortos: {elitesKilled}\nOuros coletados: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Criação de personagem",
      LAST_PLAYED_TITLE: "Última vez jogado",
      PLAYED_TIME_TITLE: "Tempo jogado",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Status",
      MODE_TITLE: "Modo",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Comandos de {username}",
      DESCRIPTION:
        "Aqui está uma lista de todos os meus comandos. Embreve, adicionaremos a capacidade de obter mais informações sobre cada comando!",
    },
    INFO: {
      STATISTICS_TITLE: "Estatísticas",
      STATISTICS_VALUE: "Servidores: {servers}\nUsuários: {users}",
      DEBUG_TITLE: "Depuração",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION:
        "{username} é um bot do Discord que fornece informações sobre o Diablo 4 desenvolvido por glazk0 & Marco!",
    },
    SETTINGS: {
      TITLE: "Configurações de notificações do seu servidor",
      VALUE: "Canal: {channel}\nCargo: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Consulta inválida!",
    NO_DATE_FOUND: "Nenhuma data encontrada!",
    NO_PLAYED_TIME: "Nenhum tempo jogado encontrado!",
    NO_EQUIPPED_ITEMS: "Nenhum item equipado encontrado!",
  },
} satisfies Translation;

export default br;
