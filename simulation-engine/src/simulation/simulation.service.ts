import { Injectable } from '@nestjs/common';

import { SimulationDto }
from './dto/simulation.dto';

import { SimulationEngine }
from './engine/simulation.engine';

import { SuccessResponse }
from '../common/responses/success.response';

@Injectable()
export class SimulationService {

  private simulationEngine =
    new SimulationEngine();

  runSimulation(
    input: SimulationDto,
  ) {

    const history =
      this.simulationEngine
        .runSimulation(input);

    return SuccessResponse.send(
      'Simulation completed successfully',
      {
        history,
      },
    );
  }
}