import type { Translation } from "../i18n-types";

const pl = {
  settings: {
    locale: {
      SUCCESS: "Ustawienia językowe serwera Discord zostały zmienione na **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "Nie mam uprawnień na wysyłanie wiadomości na kanale {channel}.",
      ALREADY_ENABLED: "Powiadomienia dla **{event}** są już włączone.",
      ENABLED: "Powiadomienia dla **{event}** zostały włączone i będą wysyłane na kanał {channel}.",
      NOT_ENABLED: "Powiadomienia dla **{event}** nie są włączone.",
      UPDATED: "Powiadomienia dla **{event}** zostały zaktualizowane i będą wysyłane na kanał {channel}.",
      DISABLED: "Powiadomienia dla **{event}** zostały wyłączone.",
      ALREADY_DISABLED: "Powiadomienia dla **{event}** są już wyłączone.",
      NO_EVENTS: "Nie są włączone żadne zdarzenia.",
      NO_EVENTS_IN_CHANNEL: "Nie są włączone żadne zdarzenia na kanale {channel}.",
      EVENTS_WORKING: "Powiadomienia dla **{event}** działają i zostaną wysłane na kanał {channel}.",
      REFRESHED: "Powiadomienia dla **{event}** zostały odświeżone i zostaną wysłane na kanał {channels}.",
    },
  },
  armory: {
    BAD_FORMAT: "Podana przez Ciebie nazwa gracza jest nieprawidłowa, powinna być w następującym formacie: `Player#1234`.",
    PLAYER_NOT_FOUND:
      "Nie znalazłem gracza o nicku **{player}**, upewnij się, że poprawnie wpisano nazwę gracza lub że taki gracz istnieje.",
    NO_CHARACTERS: "Ten gracz nie posiada żadnych postaci.",
    NO_CHARACTER:
      "Nie znaleziono postaci, upewnij się, że nazwa została wpisana poprawnie lub istnieje przynajmniej jedna postać.",
    SELECT_CHARACTER: "Proszę wybrać postać, której profil ma zostać wyświetlony.",
    MULTIPLE_CHARACTERS: "Ten gracz posiada wiele postaci. Proszę wybrać jedną z nich.",
    PLAYER_CHOICE: "{name} ({characters} postaci)",
    NOT_TRACKED_YET: 'Profil gracza "{player}" nie jest obecnie śledzony. Wyślij, aby go śledzić.',
    ERROR: 'The player "{player}" is either in the website queue or is in private mode.',
  },
  events: {
    WORLD_BOSS:
      "{name} pojawi się w {zone} ({territory}) o godzinie {time} ({countdown}).\n\nNastępnie prawdopodobnie pojawi się {nextName} około godziny {nextTime}",
    HELLTIDE:
      "Piekielny przypływ występuje w {zone} do {time}, następny Piekielny Przypływ o {nextTime}\n\nOdświeżanie skrzyń: {refresh}",
    LEGION: "Legion pojawi się o godzinie {time}, kolejny legion o godzinie {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statystyki",
      STATISTICS_VALUE:
        "Poziom świata: {worldTier}\nZabitych potworów: {monstersKilled}\nZabitych Elit: {elitesKilled}\nZebranego złota: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Tworzenie postaci",
      LAST_PLAYED_TITLE: "Ostatnio grano",
      PLAYED_TIME_TITLE: "Czas gry",
      UNIQUES_TITLE: "Uniques",
      SKILLS_TITLE: "Skills",
      STATUS_TITLE: "Status",
      MODE_TITLE: "Tryb",
      CLAN_TITLE: "Clan",
    },
    HELP: {
      TITLE: "Komendy użytkownika {username}",
      DESCRIPTION:
        "Oto lista wszystkich moich komend. Wkrótce dodamy możliwość uzyskania dodatkowych informacji na temat każdej z nich!",
    },
    INFO: {
      STATISTICS_TITLE: "Statystyki",
      STATISTICS_VALUE: "Serwery: {servers}\nUżytkownicy: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Klastry: {clusters}\nShardy: {shards}\nID Shardu: {shardId}\nID Klastra: {clusterId}",
      DESCRIPTION:
        "{username} to bot do Discorda, który dostarcza informacji na temat Diablo 4, opracowany przez glazk0 i Marco.",
    },
    SETTINGS: {
      TITLE: "Ustawienia powiadomień serwera",
      VALUE: "Kanał: {channel}\nRola: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Nieprawidłowe zapytanie.",
    NO_DATE_FOUND: "Nie znaleziono daty.",
    NO_PLAYED_TIME: "Nie znaleziono czasu gry.",
    NO_EQUIPPED_ITEMS: "Nie znaleziono wyposażonych przedmiotów.",
  },
} satisfies Translation;

export default pl;
