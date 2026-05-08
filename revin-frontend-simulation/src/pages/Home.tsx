import { type CSSProperties, useCallback, useMemo, useState } from "react";

import SimulationForm from "../components/SimulationForm";

import PlantStatusCard from "../components/PlantStatusCard";

import SimulationChart from "../components/SimulationChart";

import type { PlantState, SimulationResponse } from "../types/simulation.types";

import { runSimulation } from "../services/simulation.api";

type SimulationConfig = {
  water: string;
  sunlight: string;
  days: number;
};

export default function Home() {
  const [latestState, setLatestState] = useState<PlantState>();

  const [history, setHistory] = useState<PlantState[]>([]);

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [config, setConfig] = useState<SimulationConfig>({
    water: "MEDIUM",
    sunlight: "MEDIUM",
    days: 5,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const selectedState = history[selectedDayIndex] ?? latestState;

  const handleConfigChange = useCallback((nextConfig: SimulationConfig) => {
    setConfig(nextConfig);
  }, []);

  const insights = useMemo(() => {
    if (!selectedState) {
      return [
        "Choose a scenario to see how the plant responds over time.",
        "The timeline will let you inspect every simulated day.",
      ];
    }

    const messages = [];

    if (selectedState.growth >= 70) {
      messages.push(
        "Growth is strong; the current environment is supporting biomass gain.",
      );
    } else if (selectedState.growth < 35) {
      messages.push(
        "Growth is slow; adjust water or sunlight to improve development.",
      );
    } else {
      messages.push(
        "Growth is progressing steadily with room for optimization.",
      );
    }

    if (selectedState.stress > 60) {
      messages.push(
        "Stress is elevated; the plant is reacting negatively to the conditions.",
      );
    } else {
      messages.push(
        "Stress is controlled, so the plant can preserve energy for growth.",
      );
    }

    if (selectedState.diseaseRisk > 45) {
      messages.push(
        "Disease risk is rising; monitor health before extending the run.",
      );
    } else {
      messages.push("Disease risk is low enough for a stable growth forecast.");
    }

    return messages;
  }, [selectedState]);

  const handleRunSimulation = async (payload: {
    water: string;
    sunlight: string;
    days: number;
  }) => {
    try {
      setLoading(true);
      setError("");

      const response: SimulationResponse = await runSimulation(payload);

      const history = response.data.history;

      setHistory(history);

      const latest = history[history.length - 1];

      setLatestState(latest);
      setSelectedDayIndex(Math.max(0, history.length - 1));
    } catch (error) {
      console.error(error);
      setError("Unable to run simulation. Check that the API is available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-background)]
        px-4
        py-5
        sm:px-6
        lg:px-10
        lg:py-8
      "
    >
      <main className="mx-auto max-w-7xl">
        <section
          className="
            mb-6
            overflow-hidden
            rounded-[var(--radius-card)]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-[var(--shadow-card)]
          "
        >
          <div className="min-h-[240px] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Interactive Simulation Platform
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight text-[var(--color-secondary)] sm:text-5xl lg:text-6xl">
                Plant Growth Simulation Engine
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                Explore how water and sunlight affect growth, health, stress,
                and disease risk over time.
              </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-3 text-sm sm:grid-cols-3 lg:max-w-xl">
                <div className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <p className="font-black text-[var(--color-secondary)]">
                    {history.length || "-"}
                  </p>
                  <p className="mt-1 text-[var(--color-muted)]">Data points</p>
                </div>

                <div className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <p className="font-black text-[var(--color-secondary)]">
                    {latestState?.health ?? "-"}%
                  </p>
                  <p className="mt-1 text-[var(--color-muted)]">Health</p>
                </div>

                <div className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <p className="font-black text-[var(--color-secondary)]">
                    {latestState?.status ?? "Ready"}
                  </p>
                  <p className="mt-1 text-[var(--color-muted)]">Status</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-[var(--radius-control)] border border-red-200 bg-red-50 px-4 py-3 font-semibold text-[var(--color-danger)]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <SimulationForm
            onRunSimulation={handleRunSimulation}
            loading={loading}
            onConfigChange={handleConfigChange}
          />

          <PlantStatusCard
            state={selectedState}
            loading={loading}
            environment={config}
          />
        </div>

        {history.length > 0 && (
          <>
            <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="animate-panel-in rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Timeline Playback
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-[var(--color-secondary)]">
                      Inspect Growth Day By Day
                    </h2>
                  </div>

                  <span className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm font-black text-[var(--color-primary-dark)]">
                    Day {selectedState?.day}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={history.length - 1}
                  value={selectedDayIndex}
                  onChange={(event) =>
                    setSelectedDayIndex(Number(event.target.value))
                  }
                  className="form-range w-full"
                  style={
                    {
                      "--range-progress": `${(selectedDayIndex / Math.max(1, history.length - 1)) * 100}%`,
                    } as CSSProperties
                  }
                />

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3">
                    <p className="font-black">{selectedState?.growth}%</p>
                    <p className="mt-1 text-[var(--color-muted)]">Growth</p>
                  </div>
                  <div className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3">
                    <p className="font-black">{selectedState?.health}%</p>
                    <p className="mt-1 text-[var(--color-muted)]">Health</p>
                  </div>
                  <div className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3">
                    <p className="font-black">{selectedState?.stress}%</p>
                    <p className="mt-1 text-[var(--color-muted)]">Stress</p>
                  </div>
                  <div className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3">
                    <p className="font-black">{selectedState?.diseaseRisk}%</p>
                    <p className="mt-1 text-[var(--color-muted)]">Risk</p>
                  </div>
                </div>
              </div>

              <div className="animate-panel-in rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Insight Summary
                </p>
                <h2 className="mt-2 text-2xl font-black text-[var(--color-secondary)]">
                  What The Model Means
                </h2>

                <div className="mt-5 space-y-3">
                  {insights.map((insight) => (
                    <p
                      key={insight}
                      className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3 text-sm font-semibold leading-6 text-[var(--color-secondary)]"
                    >
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <SimulationChart
                data={history}
                title="Growth Progression"
                dataKey="growth"
              />

              <SimulationChart
                data={history}
                title="Health Progression"
                dataKey="health"
                color="#22c55e"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
