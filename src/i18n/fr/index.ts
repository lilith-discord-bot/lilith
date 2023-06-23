import type { Translation } from "../i18n-types";

const fr = {
  settings: {
    locale: {
      SUCCESS: "Les paramètres de votre serveur Discord ont été mis à jour en **{locale}**.",
    },
    notifications: {
      NO_PERMISSIONS: "Je n'ai pas l'autorisation d'envoyer des messages dans {channel}.",
      ALREADY_ENABLED: "Les notifications pour **{event}** sont déjà activées.",
      ENABLED: "Les notifications pour **{event}** ont été activées et seront envoyées à {channel}.",
      NOT_ENABLED: "Les notifications pour **{event}** ne sont pas activés.",
      UPDATED: "Les notifications pour **{event}** ont été mises à jour et seront envoyées à {channel}.",
      DISABLED: "Les notifications pour **{event}** ont été désactivés.",
      ALREADY_DISABLED: "Les notifications pour **{event}** sont déjà désactivés.",
      NO_EVENTS: "Aucun événement n'est activé.",
      NO_EVENTS_IN_CHANNEL: "Aucun événement n'est activé dans {channel}.",
      EVENTS_WORKING: "Les notifications pour **{event}** fonctionnent et seront envoyées à {channel}.",
    },
  },
  armory: {
    BAD_FORMAT: "Le pseudo que vous avez fourni n'est pas valide, il doit être dans le format suivant : `Pseudo#1234`.",
    PLAYER_NOT_FOUND:
      "Je n'ai pas pu trouver le joueur **{player}**, vérifiez que vous avez tapé le nom correctement ou que le joueur existe.",
    NO_CHARACTERS: "Le joueur ne possède aucun personnage.",
    NO_CHARACTER: "Aucun personnage trouvé, assurez-vous que vous avez tapé le nom correctement ou qu'il existe au moins un personnage avec ce nom.",
    SELECT_CHARACTER: "Sélectionnez un personnage pour voir sont armurerie.",
    MULTIPLE_CHARACTERS: "Ce joueur a plusieurs personnages. Veuillez en sélectionner un.",
    PLAYER_CHOICE: "{name} ({characters} personnages)",
    NOT_TRACKED_YET: '"{player}" n\'est pas suivi actuellement, envoyez-le pour le suivre.',
  },
  events: {
    WORLD_BOSS: "{name} apparaît dans {zone} ({territory}) à {time}.\n\nLe prochain boss attendu est {nextName} à {nextTime}",
    HELLTIDE: "Vagues infernales actuellement à {zone} jusqu'à {time}, prochaine vagues infernales à {nextTime}\n\nNouveau coffre: {refresh}",
    LEGION: "Legion apparaît à {time}, prochaine legion à {nextTime}",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "Statistiques",
      STATISTICS_VALUE:
        "Niveau de Monde: {worldTier}\nMonstres tués: {monstersKilled}\nÉlites tuées: {elitesKilled}\nOr collecté: {goldsCollected}",
      CHARACTER_CREATION_TITLE: "Création du personnage",
      LAST_PLAYED_TITLE: "Dernière fois joué",
      PLAYED_TIME_TITLE: "Temps de jeu",
      EQUIPPED_ITEMS_TITLE: "Objets équipés",
      STATUS_TITLE: "Statut",
      MODE_TITLE: "Mode",
    },
    HELP: {
      TITLE: "{username}'s commandes",
      DESCRIPTION:
        "Voici une liste de toutes mes commandes. Nous ajouterons bientôt la possibilité d'obtenir plus d'informations sur chaque commande !",
    },
    INFO: {
      STATISTICS_TITLE: "Statistiques",
      STATISTICS_VALUE: "Serveurs: {servers}\nUtilisateurs: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Clusters: {clusters}\nShards: {shards}\nShardID: {shardId}\nClusterID: {clusterId}",
      DESCRIPTION: "{username} est un bot Discord qui fournit des informations sur Diablo 4 développé par glazk0 & Marco.",
    },
    SETTINGS: {
      TITLE: "Paramètres de notification de votre serveur",
      VALUE: "Canal: {channel}\nRôle: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Requête invalide.",
    NO_DATE_FOUND: "Aucune date trouvée.",
    NO_PLAYED_TIME: "Aucun temps de jeu trouvé.",
    NO_EQUIPPED_ITEMS: "Aucun objets équipé trouvé.",
  },
} satisfies Translation;

export default fr;
