import type { CSSProperties } from "react";

import type { PlantState } from "../types/simulation.types";

interface Props {
  state?: PlantState;
  loading?: boolean;
  environment?: {
    water: string;
    sunlight: string;
    days: number;
  };
}

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

function MetricBar({
  label,
  value,
  color,
  helper,
}: {
  label: string;
  value: number;
  color: string;
  helper: string;
}) {
  const percent = clampPercent(value);

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>
          <span className="font-bold text-[var(--color-secondary)]">
            {label}
          </span>
          <span className="mt-0.5 block text-xs font-semibold text-[var(--color-muted)]">
            {helper}
          </span>
        </span>
        <span className="font-black text-[var(--color-secondary)]">
          {percent}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-soft)]">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}

function PlantGraphic({
  className = "stage-young is-healthy",
  style,
  showLeafFall,
  showDisease,
}: {
  className?: string;
  style?: CSSProperties;
  showLeafFall?: boolean;
  showDisease?: boolean;
}) {
  return (
    <svg
      className={`plant-svg ${className}`}
      viewBox="0 0 320 260"
      aria-hidden="true"
      style={style}
    >
      <ellipse className="plant-svg-shadow" cx="160" cy="228" rx="86" ry="16" />
      <path
        className="plant-svg-root root-a"
        d="M160 218 C138 230 119 231 99 242"
      />
      <path
        className="plant-svg-root root-b"
        d="M160 218 C184 230 205 231 229 243"
      />
      <path className="plant-svg-soil" d="M69 217 C95 190 226 190 252 217 C231 244 91 244 69 217Z" />
      <path
        className="plant-svg-main-stem"
        d="M160 216 C158 182 160 147 162 114 C164 82 174 58 190 38"
      />

      <g className="leaf-node node-top" transform="translate(190 38) rotate(-58)">
        <path className="plant-svg-leaf leaf-top" d="M0 0 C28 -29 64 -22 78 10 C48 28 18 23 0 0Z" />
      </g>
      <g className="leaf-node node-left-main" transform="translate(162 116) rotate(198)">
        <path className="plant-svg-branch" d="M0 0 C16 2 25 8 34 17" />
        <path className="plant-svg-leaf leaf-left-main" d="M24 12 C52 -20 96 -11 113 28 C76 48 43 40 24 12Z" />
      </g>
      <g className="leaf-node node-right-main" transform="translate(164 96) rotate(-20)">
        <path className="plant-svg-branch" d="M0 0 C18 0 28 7 38 18" />
        <path className="plant-svg-leaf leaf-right-main" d="M25 11 C57 -24 101 -11 115 31 C78 49 45 40 25 11Z" />
      </g>
      <g className="leaf-node node-left-lower" transform="translate(160 164) rotate(206)">
        <path className="plant-svg-branch" d="M0 0 C15 1 25 7 34 16" />
        <path className="plant-svg-leaf leaf-left-lower" d="M23 10 C47 -15 82 -7 95 24 C64 39 38 34 23 10Z" />
      </g>
      <g className="leaf-node node-right-lower" transform="translate(161 150) rotate(24)">
        <path className="plant-svg-branch" d="M0 0 C15 1 25 7 34 16" />
        <path className="plant-svg-leaf leaf-right-lower" d="M23 10 C48 -16 83 -8 96 24 C65 40 38 35 23 10Z" />
      </g>

      <g className="plant-svg-flower flower-a">
        <circle cx="196" cy="56" r="8" />
        <circle cx="211" cy="62" r="8" />
        <circle cx="207" cy="78" r="8" />
        <circle cx="190" cy="76" r="8" />
        <circle cx="187" cy="61" r="8" />
        <circle className="flower-center" cx="199" cy="67" r="7" />
      </g>
      <g className="plant-svg-flower flower-b">
        <circle cx="112" cy="103" r="6" />
        <circle cx="124" cy="108" r="6" />
        <circle cx="121" cy="121" r="6" />
        <circle cx="108" cy="119" r="6" />
        <circle cx="106" cy="107" r="6" />
        <circle className="flower-center" cx="115" cy="112" r="5" />
      </g>

      {showDisease && (
        <g className="plant-svg-spots">
          <circle cx="224" cy="83" r="5" />
          <circle cx="107" cy="115" r="4" />
          <circle cx="214" cy="166" r="4" />
        </g>
      )}

      {showLeafFall && (
        <g className="plant-svg-falling">
          <path className="falling-a" d="M226 125 C242 107 265 114 271 137 C250 148 235 143 226 125Z" />
          <path className="falling-b" d="M96 178 C112 160 135 168 139 190 C119 200 104 194 96 178Z" />
        </g>
      )}
    </svg>
  );
}

export default function PlantStatusCard({ state, loading, environment }: Props) {
  const waterLevel = environment?.water ?? "MEDIUM";
  const sunlightLevel = environment?.sunlight ?? "MEDIUM";
  const sceneClass = `plant-scene water-${waterLevel.toLowerCase()} sun-${sunlightLevel.toLowerCase()}`;

  if (!state) {
    return (
      <div className="animate-panel-in flex min-h-[470px] flex-col items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center shadow-[var(--shadow-card)]">
        <div className={sceneClass}>
          <span className="scene-sun" />
          <span className="scene-cloud" />
          <span className="scene-rain rain-one" />
          <span className="scene-rain rain-two" />
          <span className="scene-soil" />

          <PlantGraphic className="stage-young is-healthy" />
        </div>

        <h2 className="mt-6 text-2xl font-black text-[var(--color-secondary)]">
          {loading ? "Running Simulation" : "Waiting For Simulation"}
        </h2>

        <p className="mt-3 max-w-sm text-[var(--color-muted)]">
          {loading
            ? "Processing environmental inputs and calculating plant response."
            : "Configure environmental conditions and run the model to see growth, health, stress, and risk."}
        </p>

        {loading && (
          <div className="mt-6 w-full max-w-sm space-y-3">
            <div className="animate-shimmer h-3 rounded-full" />
            <div className="animate-shimmer mx-auto h-3 w-2/3 rounded-full" />
          </div>
        )}
      </div>
    );
  }

  const getStatusColor = () => {
    switch (state.status) {
      case "Healthy":
        return "bg-emerald-600";
      case "Stressed":
        return "bg-amber-500 text-[var(--color-secondary)]";
      case "Diseased":
        return "bg-red-600";
      case "Critical":
        return "bg-red-800";
      default:
        return "bg-slate-600";
    }
  };

  const growth = clampPercent(state.growth);
  const health = clampPercent(state.health);
  const stress = clampPercent(state.stress);
  const diseaseRisk = clampPercent(state.diseaseRisk);
  const leafScale = `${0.82 + growth / 360}`;
  const isDry = waterLevel === "LOW" || (sunlightLevel === "HIGH" && stress > 45);
  const isOverwatered = waterLevel === "HIGH" && sunlightLevel === "LOW";
  const isDiseased = diseaseRisk > 45;
  const isCritical = health < 35 || stress > 75 || diseaseRisk > 70;
  const plantSway = isCritical ? "7deg" : isDry || isDiseased ? "5deg" : "2.5deg";
  const leafColor = isDry || isDiseased || health < 45 ? "#b8a832" : "#1f9d55";
  const leafLight = isDry || isDiseased || health < 45 ? "#e2cf55" : "#9ad84f";
  const growthStage =
    growth < 25
      ? "stage-seedling"
      : growth < 55
        ? "stage-young"
        : growth < 80
          ? "stage-growing"
          : "stage-mature";
  const growthStageLabel =
    growth < 25
      ? "Seedling"
      : growth < 55
        ? "Young plant"
        : growth < 80
          ? "Growing plant"
          : "Mature plant";
  const moodClasses = [
    growthStage,
    isCritical ? "is-critical" : "",
    isDry ? "is-dry" : "",
    isOverwatered ? "is-overwatered" : "",
    isDiseased ? "is-diseased" : "",
    !isCritical && !isDry && !isOverwatered && !isDiseased ? "is-healthy" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="animate-panel-in rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Live Output
          </p>
          <h2 className="mt-2 text-2xl font-black text-[var(--color-secondary)]">
            Plant Status
          </h2>
        </div>

        <span
          className={`rounded-[var(--radius-control)] px-3 py-2 text-sm font-black ${
            loading
              ? "animate-shimmer text-[var(--color-secondary)]"
              : "bg-[var(--color-surface-soft)] text-[var(--color-primary-dark)]"
          }`}
        >
          {loading ? "Updating" : `Day ${state.day}`}
        </span>
      </div>

      <div className="flex flex-col items-center rounded-[var(--radius-card)] bg-[var(--color-surface-soft)] px-5 py-7">
        <div className={sceneClass}>
          <span className="scene-sun" />
          <span className="scene-cloud" />
          <span className="scene-rain rain-one" />
          <span className="scene-rain rain-two" />
          <span className="scene-soil" />

          <PlantGraphic
            className={moodClasses}
            style={
              {
                "--leaf-scale": leafScale,
                "--plant-sway": plantSway,
                "--color-leaf": leafColor,
                "--color-leaf-light": leafLight,
              } as CSSProperties
            }
            showLeafFall={isDry || isCritical}
            showDisease={isDiseased}
          />
        </div>

        <p className="mt-5 text-center text-sm font-semibold text-[var(--color-muted)]">
          {growthStageLabel} under {waterLevel} water and {sunlightLevel}
          sunlight at this timeline point.
        </p>
      </div>

      <div className="mt-7 space-y-5">
        <MetricBar
          label="Growth"
          value={growth}
          color="bg-[var(--color-primary)]"
          helper="Biomass response"
        />
        <MetricBar
          label="Health"
          value={health}
          color="bg-emerald-500"
          helper="Overall stability"
        />
        <MetricBar
          label="Stress"
          value={stress}
          color="bg-amber-500"
          helper="Environmental pressure"
        />
        <MetricBar
          label="Disease Risk"
          value={diseaseRisk}
          color="bg-red-500"
          helper="Predicted vulnerability"
        />
      </div>

      <div className="mt-7">
        <div
          className={`${getStatusColor()} rounded-[var(--radius-control)] px-4 py-3 text-center text-lg font-black text-white transition-all duration-500`}
        >
          {state.status}
        </div>
      </div>
    </div>
  );
}
