export default {
  settings: {
    name: "settings",
    description: "Управление настройками сервера.",
  },
  ["settings.locale"]: {
    name: "locale",
    description: "Изменение языка бота Lilith для вашего сервера.",
  },
  ["settings.locale.value"]: {
    name: "value",
    description: "Какой язык вы хотите установить для своего сервера?",
  },
  ["settings.notifications"]: {
    name: "notifications",
    description: "Управление уведомлениями на сервере.",
  },
  ["settings.notifications.enable"]: {
    name: "enable",
    description: "Включение уведомлений для события.",
  },
  ["settings.notifications.enable.event"]: {
    name: "event",
    description: "Для какого события вы хотите включить уведомления?",
  },
  ["settings.notifications.enable.channel"]: {
    name: "channel",
    description: "На какой канал вы хотите отправлять уведомления?",
  },
  ["settings.notifications.enable.role"]: {
    name: "role",
    description: "Какую роль вы хотите оповестить?",
  },
  ["settings.notifications.update"]: {
    name: "update",
    description: "Обновление настроек уведомлений для события.",
  },
  ["settings.notifications.update.event"]: {
    name: "event",
    description: "Для какого события вы хотите обновить настройки уведомлений?",
  },
  ["settings.notifications.update.channel"]: {
    name: "channel",
    description: "На какой канал вы хотите отправлять уведомления?",
  },
  ["settings.notifications.update.role"]: {
    name: "role",
    description: "Какую роль вы хотите оповещать?",
  },
  ["settings.notifications.disable"]: {
    name: "disable",
    description: "Отключение уведомлений для конкретного события.",
  },
  ["settings.notifications.disable.event"]: {
    name: "event",
    description: "Для какого события вы хотите отключить уведомления?",
  },
  ["settings.notifications.disable.channel"]: {
    name: "channel",
    description: "На какой канал вы хотите отправлять уведомления?",
  },
  ["settings.notifications.list"]: {
    name: "list",
    description: "Список всех текущих настроек уведомлений для сервера.",
  },
  ["settings.notifications.refresh"]: {
    name: "refresh",
    description: "Обновление уведомлений для определенного события.",
  },
  ["settings.notifications.refresh.event"]: {
    name: "event",
    description: "Для какого события вы хотите обновить уведомления?",
  },
  ["settings.notifications.refresh.data"]: {
    name: "data",
    description: "Для какого набора данных вы хотите обновить уведомления? Будут отображаться 2 последних.",
  },
  altars: {
    name: "altars",
    description: "Отображает информацию об Алтарях Лилит.",
  },
  ["altars.show"]: {
    name: "show",
    description: "Выберите регион для отображения.",
  },
  armory: {
    name: "armory",
    description: "Отображает информацию об определенном игроке.",
  },
  ["armory.player"]: {
    name: "player",
    description: "Игрок, для которого необходимо получить информацию. Это может быть баттлтаг или имя пользователя.",
  },
  chart: {
    name: "chart",
    description: "Отображает один из созданных графиков.",
  },
  ["chart.show"]: {
    name: "show",
    description: "Определенный график для отображения.",
  },
  item: {
    name: "item",
    description: "Поиск информации о конкретном предмете.",
  },
  ["item.query"]: {
    name: "query",
    description: "Название предмета, о котором вы хотите узнать.",
  },
  map: {
    name: "map",
    description: "Поиск информации о конкретных метках, квестах и т.д. на карте.",
  },
  ["map.type"]: {
    name: "type",
    description: "Тип предмета, о котором вы хотите узнать.",
  },
  ["map.query"]: {
    name: "query",
    description: "Имя предмета, о котором вы хотите узнать.",
  },
  season: {
    name: "season",
    description: "Отображает информацию о текущем сезоне.",
  },
  ["season.get"]: {
    name: "get",
    description: "Информация.",
  },
  about: {
    name: "about",
    description: "Отображение информации о Lilith.",
  },
  help: {
    name: "help",
    description: "Отображает все команды бота Lilith.",
  },
};
