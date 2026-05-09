import { Rule } from '../interfaces/rule.interface';
import { Level } from '../types/level.enum';

export const plantRules: Rule[] = [

  // LOW WATER + LOW SUNLIGHT
  {
    condition: {
      water: Level.LOW,
      sunlight: Level.LOW,
    },

    effects: {
      growth: -10,
      health: -10,
      stress: +10,
    },
  },

  // LOW WATER + MEDIUM SUNLIGHT
  {
    condition: {
      water: Level.LOW,
      sunlight: Level.MEDIUM,
    },

    effects: {
      growth: -8,
      health: -12,
      stress: +15,
    },
  },

  // LOW WATER + HIGH SUNLIGHT
  {
    condition: {
      water: Level.LOW,
      sunlight: Level.HIGH,
    },

    effects: {
      growth: -5,
      health: -20,
      stress: +20,
    },
  },

  // MEDIUM WATER + LOW SUNLIGHT
  {
    condition: {
      water: Level.MEDIUM,
      sunlight: Level.LOW,
    },

    effects: {
      growth: +2,
      health: -5,
      stress: +5,
    },
  },

  // MEDIUM WATER + MEDIUM SUNLIGHT
  {
    condition: {
      water: Level.MEDIUM,
      sunlight: Level.MEDIUM,
    },

    effects: {
      growth: +12,
      health: +5,
      stress: -5,
    },
  },

  // MEDIUM WATER + HIGH SUNLIGHT
  {
    condition: {
      water: Level.MEDIUM,
      sunlight: Level.HIGH,
    },

    effects: {
      growth: +15,
      health: +3,
      stress: +5,
    },
  },

  // HIGH WATER + LOW SUNLIGHT
  {
    condition: {
      water: Level.HIGH,
      sunlight: Level.LOW,
    },

    effects: {
      growth: -2,
      health: -10,
      diseaseRisk: +20,
    },
  },

  // HIGH WATER + MEDIUM SUNLIGHT
  {
    condition: {
      water: Level.HIGH,
      sunlight: Level.MEDIUM,
    },

    effects: {
      growth: +5,
      health: -2,
      diseaseRisk: +10,
      stress: +3,
    },
  },

  // HIGH WATER + HIGH SUNLIGHT
  {
    condition: {
      water: Level.HIGH,
      sunlight: Level.HIGH,
    },

    effects: {
      growth: +10,
      health: +2,
      stress: +8,
    },
  },
];