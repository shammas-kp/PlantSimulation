import { Rule } from '../interfaces/rule.interface';
import { Level } from '../types/level.enum';

export const plantRules: Rule[] = [

  {
    condition: {
      water: Level.LOW,
      sunlight: Level.HIGH,
    },

    effects: {
      health: -20,
      stress: +15,
      growth: -5,
    },
  },

  {
    condition: {
      water: Level.MEDIUM,
      sunlight: Level.MEDIUM,
    },

    effects: {
      health: +5,
      growth: +12,
      stress: -5,
    },
  },

  {
    condition: {
      water: Level.HIGH,
      sunlight: Level.LOW,
    },

    effects: {
      diseaseRisk: +20,
      health: -10,
      growth: -2,
    },
  },
];