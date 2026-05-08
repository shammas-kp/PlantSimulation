import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { SimulationService }
from './simulation.service';

import { SimulationDto }
from './dto/simulation.dto';

@Controller('simulation')
export class SimulationController {

  constructor(
    private readonly simulationService:
    SimulationService,
  ) {}

  @Post()
  runSimulation(
    @Body() body: SimulationDto,
  ) {

    return this.simulationService
      .runSimulation(body);
  }
}