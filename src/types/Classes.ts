
/**
 * The class type.
 * @type {Classe}
 */
export type Classes =
  | 'allclasses'
  | 'Barbarian'
  | 'Druid'
  | 'Necromancer'
  | 'Rogue'
  | 'Sorcerer';

/**
 * The class choices.
 * @type {ClassesChoices}
 */
export type ClassesChoices = {
  name: string;
  value: Classes;
};

export type Stats = {
  overall: [
    [
      string,
      string | number
    ]
  ],
  top100: [
    [
      string,
      string | number
    ]
  ]
}