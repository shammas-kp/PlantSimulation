import { Level } from '../types/level.enum';

export interface Rule {
  condition: {
    water: Level;
    sunlight: Level;
  };

  effects: {
    growth?: number;
    health?: number;
    stress?: number;
    diseaseRisk?: number;
  };
}