export interface PlantState {

  day: number;

  growth: number;

  health: number;

  stress: number;

  diseaseRisk: number;

  status: string;
}

export interface SimulationResponse {

  success: boolean;

  message: string;

  data: {
    history: PlantState[];
  };

  timestamp: string;
}