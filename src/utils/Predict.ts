import { Event, HelltideEvent } from "../types";

// Huge thanks to shalzuth

export const helltideChests = [
  [
    {
      value: "2B",
    },
    {
      value: "2A",
    },
  ],
  [
    {
      value: "1B",
    },
    {
      value: "1A",
    },
    {
      value: "1C",
    },
    {
      value: "1D",
    },
  ],
  [
    {
      value: "2C",
    },
    {
      value: "2A",
    },
    {
      value: "2B",
    },
    {
      value: "2D",
    },
  ],
  [
    {
      value: "1B",
    },
    {
      value: "1A",
    },
  ],
  [
    {
      value: "2A",
    },
    {
      value: "2B",
    },
  ],
  [
    {
      value: "1C",
    },
    {
      value: "1A",
    },
    {
      value: "1B",
    },
  ],
  [
    {
      value: "1A",
    },
    {
      value: "1B",
    },
  ],
  [
    {
      value: "1B",
    },
    {
      value: "1A",
    },
  ],
  [
    {
      value: "2A",
    },
    {
      value: "2B",
    },
  ],
  [
    {
      value: "2B",
    },
    {
      value: "2A",
    },
  ],
  [
    {
      value: "3B",
    },
    {
      value: "3A",
    },
  ],
];

const chests = [];

chests[0] = [helltideChests[0][1], helltideChests[0][0]]; // swap frac

chests[1] = [helltideChests[1][3], helltideChests[1][2], helltideChests[1][0], helltideChests[1][1]]; // swap scos1

chests[2] = [helltideChests[2][1], helltideChests[2][2], helltideChests[2][0], helltideChests[2][3]]; // swap scos2

chests[3] = helltideChests[3]; // swap

chests[4] = helltideChests[4]; // swap kehj

chests[5] = [helltideChests[5][1], helltideChests[5][2], helltideChests[5][0]]; // swap kehj

chests[6] = [helltideChests[6][1], helltideChests[6][0]]; // swap hawe

chests[7] = helltideChests[7]; // swap step

chests[8] = helltideChests[8]; // swap step

chests[9] = [helltideChests[9][1], helltideChests[9][0]]; // swap hawe

chests[10] = [helltideChests[10][1], helltideChests[10][0]]; // swap awe

export const map = {
  frac: {
    "2A_1B": 0,
    "2B_1A": 1,
  },
  step: {
    "1B_2A": 0,
    "1A_2B": 1,
  },
  hawe: {
    "1B_2A": 0,
    "1A_2B": 1,
  },
  scos: {
    "1D_2A": 0,
    "1C_2B": 1,
    "1B_2C": 2,
    "1A_2D": 3,
  },
  kehj: {
    "2A_1A_3A": 0,
    "2B_1B_3B": 1,
    "2A_1C_3A": 2,
    "2B_1A_3B": 3,
    "2A_1B_3A": 4,
    "2B_1C_3B": 5,
  },
} as Record<string, Record<string, number>>;

/**
 * Get the zone index.
 *
 * @param zone - The zone name.
 *
 * @returns - The zone index.
 */
export const getZones = (zone: string) => {
  switch (zone) {
    case "frac":
      return [0, 3];
    case "step":
      return [7, 8];
    case "hawe":
      return [6, 9];
    case "scos":
      return [1, 2];
    case "kehj":
      return [4, 5, 10];
    default:
      return [0];
  }
};

/**
 * Get the key of the chest.
 *
 * @param zone - The zone name.
 * @param timestamp - The timestamp of the chest.
 *
 * @returns - The key of the chest.
 */

export const getChestsKey = (event: HelltideEvent) => {
  const now = new Date().getTime() / 1000;

  let hour;

  if (event.refresh === 0 || (now > event.timestamp && now < event.refresh)) {
    hour = new Date(event.timestamp * 1000).getUTCHours();
  } else if (event.refresh > 0 && now >= event.refresh) {
    hour = new Date(event.refresh * 1000).getUTCHours();
  }

  console.debug(hour, event);

  // Temporary fix
  if (hour === undefined) hour = new Date().getUTCHours();

  const key = getZones(event.zone).map((zone) => {
    const chest = hour % chests[zone].length;
    return chests[zone][chest].value;
  });

  console.debug(map[event.zone][key.join("_")], key);

  return map[event.zone][key.join("_")];
};
