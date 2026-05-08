import { PlantState } from '../interfaces/plant-state.interface';
import { Rule } from '../interfaces/rule.interface';
import { Level } from '../types/level.enum';

export class RuleProcessor {

  applyRules(
    currentState: PlantState,
    water: Level,
    sunlight: Level,
    rules: Rule[],
  ): PlantState {

    const updatedState = { ...currentState };

    for (const rule of rules) {

      const matched =
        rule.condition.water === water &&
        rule.condition.sunlight === sunlight;

      if (matched) {

        updatedState.growth += rule.effects.growth || 0;

        updatedState.health += rule.effects.health || 0;

        updatedState.stress += rule.effects.stress || 0;

        updatedState.diseaseRisk +=
          rule.effects.diseaseRisk || 0;
      }
    }

    updatedState.health =
    Math.max(
        0,
        Math.min(100, updatedState.health),
    );

    updatedState.stress =
    Math.max(
        0,
        Math.min(100, updatedState.stress),
    );

    updatedState.diseaseRisk =
    Math.max(
        0,
        Math.min(100, updatedState.diseaseRisk),
    );
    

    return updatedState;
  }
}