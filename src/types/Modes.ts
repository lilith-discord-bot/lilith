/**
 * The mode type.
 * @type {Mode}
 */
export type Modes = 'allmodes' | 'softcore' | 'hardcore' | 'dead' | 'pvp';

export type ModesChoices = {
  name: string;
  value: Modes;
};