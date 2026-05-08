import { type CSSProperties, useEffect, useState } from "react";

interface Props {
  onRunSimulation: (payload: {
    water: string;
    sunlight: string;
    days: number;
  }) => void;

  loading?: boolean;
  onConfigChange?: (config: {
    water: string;
    sunlight: string;
    days: number;
  }) => void;
}

const levels = ["LOW", "MEDIUM", "HIGH"];

const presets = [
  {
    name: "Balanced",
    water: "MEDIUM",
    sunlight: "MEDIUM",
    days: 12,
  },
  {
    name: "Drought",
    water: "LOW",
    sunlight: "HIGH",
    days: 18,
  },
  {
    name: "Low Light",
    water: "MEDIUM",
    sunlight: "LOW",
    days: 14,
  },
  {
    name: "Overwater",
    water: "HIGH",
    sunlight: "LOW",
    days: 10,
  },
];

const levelHelp: Record<string, string> = {
  LOW: "Conservative",
  MEDIUM: "Balanced",
  HIGH: "Intensive",
};

export default function SimulationForm({
  onRunSimulation,
  loading,
  onConfigChange,
}: Props) {
  const [water, setWater] = useState("MEDIUM");

  const [sunlight, setSunlight] = useState("MEDIUM");

  const [days, setDays] = useState(5);

  const rangeProgress = `${((days - 1) / 29) * 100}%`;

  useEffect(() => {
    onConfigChange?.({ water, sunlight, days });
  }, [water, sunlight, days, onConfigChange]);

  const handleSubmit = () => {
    if (loading) {
      return;
    }

    onRunSimulation({
      water,
      sunlight,
      days: Math.max(1, Math.min(30, days || 1)),
    });
  };

  const applyPreset = (preset: (typeof presets)[number]) => {
    setWater(preset.water);
    setSunlight(preset.sunlight);
    setDays(preset.days);
  };

  return (
    <div
      className="
        animate-panel-in
        w-full
        rounded-[var(--radius-card)]
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        p-5
        shadow-[var(--shadow-card)]
        sm:p-6
      "
    >
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Growth Inputs
          </p>

          <h2 className="mt-2 text-2xl font-black text-[var(--color-secondary)]">
            Configure Simulation
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Tune the environment and forecast how the plant responds.
          </p>
        </div>

        <span className="shrink-0 rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm font-bold text-[var(--color-primary-dark)]">
          {days}d
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-bold text-[var(--color-secondary)]">
            Scenario Presets
          </label>

          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="min-h-11 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-white px-3 text-left text-sm font-black text-[var(--color-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold text-[var(--color-secondary)]">
            Water Level
          </label>

          <div className="grid grid-cols-3 gap-2">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={water === level}
                onClick={() => setWater(level)}
                className={`
                  min-h-16
                  rounded-[var(--radius-control)]
                  border
                  px-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    water === level
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]"
                      : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                  }
                `}
              >
                <span className="block text-sm font-black">{level}</span>
                <span
                  className={`mt-1 block text-xs font-semibold ${
                    water === level ? "text-white/80" : "text-[var(--color-muted)]"
                  }`}
                >
                  {levelHelp[level]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold text-[var(--color-secondary)]">
            Sunlight Level
          </label>

          <div className="grid grid-cols-3 gap-2">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={sunlight === level}
                onClick={() => setSunlight(level)}
                className={`
                  min-h-16
                  rounded-[var(--radius-control)]
                  border
                  px-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    sunlight === level
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-secondary)] shadow-[var(--shadow-soft)]"
                      : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-secondary)]"
                  }
                `}
              >
                <span className="block text-sm font-black">{level}</span>
                <span
                  className={`mt-1 block text-xs font-semibold ${
                    sunlight === level
                      ? "text-[var(--color-secondary)]/70"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  {levelHelp[level]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-sm font-bold text-[var(--color-secondary)]">
              Simulation Days
            </label>

            <span className="text-sm font-semibold text-[var(--color-muted)]">
              1-30
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="form-range w-full"
            style={
              {
                "--range-progress": rangeProgress,
              } as CSSProperties
            }
          />

          <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            <span>Short</span>
            <span>Extended</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] p-3 text-sm">
          <div>
            <p className="font-black text-[var(--color-secondary)]">{water}</p>
            <p className="mt-1 text-[var(--color-muted)]">Water</p>
          </div>
          <div>
            <p className="font-black text-[var(--color-secondary)]">
              {sunlight}
            </p>
            <p className="mt-1 text-[var(--color-muted)]">Sunlight</p>
          </div>
          <div>
            <p className="font-black text-[var(--color-secondary)]">{days}</p>
            <p className="mt-1 text-[var(--color-muted)]">Days</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
            flex
            min-h-12
            w-full
            items-center
            justify-center
            rounded-[var(--radius-control)]
            bg-[var(--color-primary)]
            px-4
            py-3
            font-black
            text-white
            shadow-[var(--shadow-soft)]
            transition-all
            duration-300
            hover:bg-[var(--color-primary-dark)]
            hover:-translate-y-0.5
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </div>
    </div>
  );
}
