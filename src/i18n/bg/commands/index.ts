export default {
  settings: {
    name: "settings",
    description: "Управлявайте настройките на вашия сървър.",
  },
  ["settings.locale"]: {
    name: "locale",
    description: "Променете езика на Lilith за вашия сървър.",
  },
  ["settings.locale.value"]: {
    name: "value",
    description: "Кой език искате да зададете за вашия сървър?",
  },
  ["settings.notifications"]: {
    name: "notifications",
    description: "Управлявайте известията на вашия сървър.",
  },
  ["settings.notifications.enable"]: {
    name: "enable",
    description: "Активирайте известия за дадено събитие.",
  },
  ["settings.notifications.enable.event"]: {
    name: "event",
    description: "За кое събитие искате да активирате известията?",
  },
  ["settings.notifications.enable.channel"]: {
    name: "channel",
    description: "В кой канал искате да изпращате известия?",
  },
  ["settings.notifications.enable.role"]: {
    name: "role",
    description: "Коя роля искате да маркирате?",
  },
  ["settings.notifications.update"]: {
    name: "update",
    description: "Обновете настройките за известия за дадено събитие.",
  },
  ["settings.notifications.update.event"]: {
    name: "event",
    description: "За кое събитие искате да обновите настройката за известия?",
  },
  ["settings.notifications.update.channel"]: {
    name: "channel",
    description: "В кой канал искате да изпращате известия?",
  },
  ["settings.notifications.update.role"]: {
    name: "role",
    description: "Коя роля искате да маркирате?",
  },
  ["settings.notifications.disable"]: {
    name: "disable",
    description: "Деактивирайте известията за дадено събитие.",
  },
  ["settings.notifications.disable.event"]: {
    name: "event",
    description: "За кое събитие искате да деактивирате известията?",
  },
  ["settings.notifications.disable.channel"]: {
    name: "channel",
    description: "В кой канал искате да изпращате известия?",
  },
  ["settings.notifications.list"]: {
    name: "list",
    description: "Показва всички текущи настройки за известия за вашия сървър.",
  },
  ["settings.notifications.refresh"]: {
    name: "refresh",
    description: "Опреснете известията за дадено събитие.",
  },
  ["settings.notifications.refresh.event"]: {
    name: "event",
    description: "За кое събитие искате да опресните известията?",
  },
  ["settings.notifications.refresh.data"]: {
    name: "data",
    description: "За кой комплект данни искате да опресните известията? Последните 2 ще бъдат показани.",
  },
  altars: {
    name: "altars",
    description: "Показва информация за Олтарите на Lilith.",
  },
  ["altars.show"]: {
    name: "show",
    description: "Посочената област за показване.",
  },
  armory: {
    name: "armory",
    description: "Показва информация за даден играч.",
  },
  ["armory.player"]: {
    name: "player",
    description: "Играчът, за който искате информация. Може да бъде battletag или потребителско име.",
  },
  chart: {
    name: "chart",
    description: "Показва една от създадените диаграми.",
  },
  ["chart.show"]: {
    name: "show",
    description: "Конкретната диаграма, която искате да покажете.",
  },
  item: {
    name: "item",
    description: "Търси информация за конкретен предмет.",
  },
  ["item.query"]: {
    name: "query",
    description: "Името на нещото, за което искате да разберете повече.",
  },
  map: {
    name: "map",
    description: "Търси информация за конкретни маркери, куестове и т.н. на картата.",
  },
  ["map.type"]: {
    name: "type",
    description: "Типът на нещото, за което искате да разберете повече.",
  },
  ["map.query"]: {
    name: "query",
    description: "Името на нещото, за което искате да разберете.",
  },
  season: {
    name: "season",
    description: "Displays information about the current season.",
  },
  ["season.get"]: {
    name: "get",
    description: "The information to retrieve.",
  },
  about: {
    name: "about",
    description: "Показва информация за Lilith.",
  },
  help: {
    name: "help",
    description: "Показва всички команди на Lilith.",
  },
};
