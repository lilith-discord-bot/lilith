import type { Translation } from "../i18n-types";

const ru = {
  settings: {
    locale: {
      SUCCESS: "Язык бота изменен на **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "У меня нет прав на отправку сообщений в {channel}.",
      ALREADY_ENABLED: "Уведомления для **{event}** уже включены.",
      ENABLED: "Уведомления для **{event}** были включены и будут отправляться на канал {channel}.",
      NOT_ENABLED: "Уведомления для **{event}** не включены.",
      UPDATED: "Уведомления для **{event}** были обновлены и будут отправлены на канал {channel}.",
      DISABLED: "Уведомления для **{event}** были отключены.",
      ALREADY_DISABLED: "Уведомления для **{event}** уже отключены.",
      NO_EVENTS: "Нет ни одного включенного события.",
      NO_EVENTS_IN_CHANNEL: "Не включено ни одного события в канале {channel}.",
      EVENTS_WORKING: "Уведомления для **{event}** работают и будут отправляться в канал {channel}.",
      REFRESHED: "Уведомления для **{event}** были обновлены и будут отправляться в канал {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "Указанный Вами игрок не подходит, он должен быть указан в формате, указанном ниже: `Player#1234`.",
    PLAYER_NOT_FOUND: "Я не нашел игрока **{player}**, убедитесь, что вы правильно ввели имя или что игрок существует.",
    NO_CHARACTERS: "У игрока нет ни одного персонажа.",
    NO_CHARACTER: "Персонаж не найден, убедитесь, что вы правильно набрали имя или что имеется хотя бы один символ.",
    SELECT_CHARACTER: "Выберите персонажа, чтобы открыть ивентарь.",
    MULTIPLE_CHARACTERS: "У этого игрока несколько персонажей. Пожалуйста, выберите одного.",
    PLAYER_CHOICE: "{name} ({characters} персонажи)",
    NOT_TRACKED_YET: '"{player}" в настоящее время не отслеживается, отправьте для отслеживания.',
    ERROR: 'The player "{player}" находится либо в очереди на сайте, либо в приватном режиме.',
  },
  events: {
    WORLD_BOSS:
      "{name} появится в {zone} ({territory}) в {time} ({countdown}).\n\nСледующий Мировой босс {nextName} появится в {nextTime}",
    HELLTIDE: "Адский натиск в {zone} до {time}, следующий Натиск в {nextTime}\n\nСундуки обновлены: {refresh}",
    LEGION: "Появление Легиона в {time}, следующий Легион в {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Статистика",
      STATISTICS_VALUE:
        "Уровень мира: {worldTier}\nУбито монстров: {monstersKilled}\nУбито элиток: {elitesKilled}\nСобранное золото: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Дата создания персонажа",
      LAST_PLAYED_TITLE: "Последняя игра",
      PLAYED_TIME_TITLE: "Время игры",
      UNIQUES_TITLE: "Уникальные",
      SKILLS_TITLE: "Скилы",
      STATUS_TITLE: "Статус",
      MODE_TITLE: "Мод игры",
      CLAN_TITLE: "Клан",
    },
    HELP: {
      TITLE: "Команды бота {username}",
      DESCRIPTION:
        "Здесь перечислен список всех моих команд. В ближайшее время мы добавим возможность получения дополнительной информации о каждой команде!",
    },
    INFO: {
      STATISTICS_TITLE: "Статистика",
      STATISTICS_VALUE: "Серверов: {servers}\nПользователей: {users}",
      DEBUG_TITLE: "Отладка",
      DEBUG_VALUE: "Группа: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} это Discord-бот, предоставляющий информацию о Diablo 4, разработанный glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Настройки уведомлений на вашем сервере",
      VALUE: "Канал: {channel}\nРоль: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Неверный запрос.",
    NO_DATE_FOUND: "Данные не найдены.",
    NO_PLAYED_TIME: "Не найдено время игры.",
    NO_EQUIPPED_ITEMS: "Не найдено ни одного надетого предмета.",
  },
} satisfies Translation;

export default ru;
