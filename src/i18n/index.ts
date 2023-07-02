import { Locale } from "discord.js";
import { existsSync } from "fs";
import { resolve } from "path";

import { DiscordLocales, LocalDiscordLocaleMappings } from "../utils/Constants";

import { locales } from "./i18n-util";

interface Command {
  name: string;
  description: string;
  name_localizations: { [locale: string]: string };
  description_localizations: { [locale: string]: string };
}

interface CommandLocalization {
  name: string;
  description: string;
}

interface AllCommands {
  [locale: string]: { [key: string]: CommandLocalization };
}

export const commands: { [key: string]: Command } = {};

const allCommands: AllCommands = {};

// REFACTOR & Handle choices

export const initLocales = async (): Promise<void> => {
  await Promise.all(
    locales
      .filter((locale) => {
        const path = resolve(__dirname, locale, "commands", "index.js");
        return (
          existsSync(path) &&
          (DiscordLocales.includes(locale as Locale) || DiscordLocales.includes(LocalDiscordLocaleMappings[locale]))
        );
      })
      .map(async (locale) => {
        const path = resolve(__dirname, locale, "commands", "index.js");
        const localeKey = DiscordLocales.includes(locale as Locale)
          ? (locale as Locale)
          : DiscordLocales.includes(LocalDiscordLocaleMappings[locale])
          ? LocalDiscordLocaleMappings[locale]
          : undefined;

        if (localeKey) {
          allCommands[localeKey] = (await import(path)).default;
        }
      })
  );

  if (locales.includes("en")) {
    const enCommands = allCommands["en-US"];

    Object.entries(enCommands).forEach(([key, { name, description }]) => {
      const command: Command = {
        name,
        description,
        name_localizations: {
          "en-US": name,
        },
        description_localizations: {
          "en-US": description,
        },
      };

      locales
        .filter((locale) => locale !== "en")
        .forEach((locale) => {
          const localeKey = DiscordLocales.includes(locale as Locale)
            ? (locale as Locale)
            : DiscordLocales.includes(LocalDiscordLocaleMappings[locale])
            ? LocalDiscordLocaleMappings[locale]
            : undefined;

          if (localeKey) {
            const l7d = allCommands[localeKey]?.[key];
            if (l7d) {
              command.name_localizations[localeKey] = l7d.name;
              command.description_localizations[localeKey] = l7d.description;
            }
          }
        });

      commands[key] = command;
    });
  }
};
