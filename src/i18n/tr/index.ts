import type { Translation } from "../i18n-types";

const tr = {
  settings: {
    locale: {
      SUCCESS: "Discord sunucunuzun konumu **{locale}** olarak ayarlandı.",
    },
    notifications: {
      NO_PERMISSIONS: "{channel} kanalına mesaj göndermek için yetkim yok.",
      ALREADY_ENABLED: "**{event}** için bildirimler zaten aktif.",
      ENABLED: "**{event}** için bildirimler aktifleştirildi ve {channel} kanalına gönderilecek.",
      NOT_ENABLED: "**{event}** için bildirimler aktif değil.",
      UPDATED: "**{event}** için bildirimler güncellendi ve {channel} kanalına gönderilecek.",
      DISABLED: "**{event}** için bildirimler kapatıldı.",
      ALREADY_DISABLED: "**{event}** için bildirimler zaten kapalı.",
      NO_EVENTS: "Hiçbir etkinlik aktif değil.",
      NO_EVENTS_IN_CHANNEL: "{channel} kanalında hiçbir etkinlik aktif değil.",
      EVENTS_WORKING: "**{event}** için bildirimler çalışıyor ve {channel} kanalına gönderilecek.",
      REFRESHED: "**{event}** için bildirimler yenilendi ve {channels} kanalına gönderilecek.",
    },
  },
  armory: {
    BAD_FORMAT: "Yazdığınız oyuncu mevcut değil, yazı formatı bu şekilde olmalı: `Player#1234`.",
    PLAYER_NOT_FOUND:
      " **{player}** oyuncusunu bulamadım, yazdığın ismin doğru olduğundan ya da böyle bir oyuncunun var olduğundan emin ol.",
    NO_CHARACTERS: "Bu oyuncunun hiçbir karakteri yok.",
    NO_CHARACTER: "Karakter bulunamadı, yazdığın ismin doğru olduğundan ya da böyle bir karakterin var olduğundan emin ol.",
    SELECT_CHARACTER: "Armorysini görmek istediğin karakteri seç.",
    MULTIPLE_CHARACTERS: "Bu oyuncu birden fazla karaktere sahip. Lütfen birini seç.",
    PLAYER_CHOICE: "{name} ({characters} karakterler)",
    NOT_TRACKED_YET: '"{player}" şu anda takip edilmiyor, takip etmek için gönder.',
    ERROR: '"{player}" isimli oyuncu zaten sırada ya da gizli modta.',
  },
  events: {
    WORLD_BOSS:
      "{name} isimli event {zone}'de/da doğacak. ({territory})'de {time} saatinde. ({countdown}).\n\nSıradaki beklenen boss {nextName}, {nextTime} saatinde doğacak.",
    HELLTIDE:
      "Cehennem Dalgası {zone}'de/da {time} saatine kadar sürecek, bir sonraki Cehennem Dalgası {nextTime} saatinde.\n\nSandık yenilenmesi: {refresh}",
    LEGION: "Lejyon etkinliği {time} saatinde, bir sonraki lejyon etkinliği {nextTime} saatinde.",
  },
  embeds: {
    ARMORY: {
      STATISTICS_TITLE: "İstatistikler",
      STATISTICS_VALUE:
        "Dünya Seviyesi: {worldTier}\nÖldürülen yaratık: {monstersKilled}\nÖldürülen elit: {elitesKilled}\nToplanan altın: {goldCollected}",
      CHARACTER_CREATION_TITLE: "Karakter yaratma",
      LAST_PLAYED_TITLE: "Son oynanan zaman",
      PLAYED_TIME_TITLE: "Toplam oynanan zaman",
      UNIQUES_TITLE: "Benzersizler",
      SKILLS_TITLE: "Yetenekler",
      STATUS_TITLE: "Durum",
      MODE_TITLE: "Mod",
      CLAN_TITLE: "Klan",
    },
    HELP: {
      TITLE: "{username}'in komutları",
      DESCRIPTION: "Tüm komutlarımın listesi burada. Her komut için bilgilendirme becerilerini yakında ekliyor olacağız.",
    },
    INFO: {
      STATISTICS_TITLE: "İstatistikler",
      STATISTICS_VALUE: "Sunucular: {servers}\nKullanıcılar: {users}",
      DEBUG_TITLE: "Debug",
      DEBUG_VALUE: "Kümeler: {clusters}\nParçalar: {shards}\nParçaID: {shardId}\nKümeID: {clusterId}",
      DESCRIPTION: "{username} glazk0 & Marco tarafından geliştirilen Diablo 4 hakkında bilgi sağlayan bir Discord botudur.",
    },
    SETTINGS: {
      TITLE: "Sunucunuzun bildirim ayarları",
      VALUE: "Kanal: {channel}\nRol: {role}",
    },
  },
  misc: {
    INVALID_QUERY: "Geçersiz sorgu",
    NO_DATE_FOUND: "Tarih bulunamadı.",
    NO_PLAYED_TIME: "Oynanan zaman bulunamadı.",
    NO_EQUIPPED_ITEMS: "Kuşanmış eşya bulunamadı.",
  },
} satisfies Translation;

export default tr;
