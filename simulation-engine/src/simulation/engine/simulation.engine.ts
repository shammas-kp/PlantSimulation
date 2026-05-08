import { SimulationDto } from '../dto/simulation.dto';
import { PlantState } from '../interfaces/plant-state.interface';
import { RuleProcessor } from './rule.processor';
import { plantRules } from '../rules/plant.rules';

export class SimulationEngine {

  private ruleProcessor = new RuleProcessor();

  runSimulation(
    input: SimulationDto,
  ): PlantState[] {

    let currentState: PlantState = {

      day: 0,

      growth: 0,

      health: 100,

      stress: 0,

      diseaseRisk: 0,

      status: 'Healthy',
    };

    const history: PlantState[] = [];

    for (
      let day = 1;
      day <= input.days;
      day++
    ) {

      currentState.day = day;

      currentState =
        this.ruleProcessor.applyRules(
          currentState,
          input.water,
          input.sunlight,
          plantRules,
        );

      currentState.status =
        this.getPlantStatus(currentState);

      history.push({ ...currentState });
    }

    return history;
  }

  private getPlantStatus(
    state: PlantState,
  ): string {

    if (state.health <= 30) {
      return 'Critical';
    }

    if (state.stress >= 50) {
      return 'Stressed';
    }

    if (state.diseaseRisk >= 60) {
      return 'Diseased';
    }

    return 'Healthy';
  }
}