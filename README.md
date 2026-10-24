<div align="center">
  <img src="./assets/hero.png" alt="ISRO Web Experience — Aerospace Mission Control" width="100%" />
</div>

# ISRO Web Experience — Mission Control Simulation

<p align="center">
  <a href="https://diufoundry.online"><img alt="Studio" src="https://img.shields.io/badge/DIU_FOUNDRY-STUDIO_R%26D-0B192C?style=for-the-badge&logoColor=38BDF8&labelColor=050B14" /></a>&nbsp;
  <img alt="Domain" src="https://img.shields.io/badge/AEROSPACE-MISSION_CONTROL-FF9933?style=for-the-badge&labelColor=050B14" />&nbsp;
  <img alt="Data status" src="https://img.shields.io/badge/DATA-SIMULATED_MISSION_SCENARIOS-10B981?style=for-the-badge&labelColor=050B14" />&nbsp;
  <img alt="Stack" src="https://img.shields.io/badge/REACT_+_VITE-FRAMER_MOTION-38BDF8?style=for-the-badge&labelColor=050B14" />
</p>

<p align="center">
  <b>Explore aerospace telemetry concepts through a simulated mission-control interface.</b><br/>
  <em>An interactive mission control workbench simulating deep-space telemetry, satellite network health, and AI incident triage.</em>
</p>

---

## ✦ Mission Overview

> **Data note:** Mission values, network indicators, and incident states in this repository are simulated or illustrative. They are not official ISRO data, telemetry from a real spacecraft, or instructions for a real mission.

The **ISRO Web Experience** is a front-end mission-control concept by DIU Foundry. It brings sample orbital parameters, ground-station-style status panels, and anomaly-triage interactions into one simulated command interface. It is not affiliated with or connected to ISRO mission systems and does not display verified live spacecraft telemetry.

```text
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                           ISRO MISSION CONTROL HUD                          │
 ├─────────────────────┬───────────────────────────────┬───────────────────────┤
 │ SAMPLE ORBIT DATA   │     DEMO NETWORK STATUS      │ TRIAGE DEMONSTRATION  │
 │ Orbit: illustrative│ Stations: sample labels       │ Status: simulated     │
 │ Values: demo data   │ Link health: illustrative     │ No live telecommand   │
 └─────────────────────┴───────────────────────────────┴───────────────────────┘
```

---

## 🛰️ Architecture & Dataflow

```text
[ SIMULATED SPACE SEGMENT ]
    │  (Sample mission values · not live data)
    ▼
[ ILLUSTRATIVE GROUND-STATION VIEW ]
    │  (Demonstration telemetry records)
    ▼
[ TELEMETRY INGESTION ENGINE ] ──► [ RECHARTS HUD MATRIX ]
    │                                     │
    ├─► [ NETWORK HEALTH MONITOR ]        ├─► Orbit Parameter Plots
    ├─► [ AI INCIDENT TRIAGE BUS ]        └─► Ground Station Latency
    │           │
    │           ▼
    └─► [ SESSION CONTEXT PROVIDER ] ──► [ OPERATOR INTERFACE ]
```

---

## ✦ Key Systems & Capabilities

- **Interactive Telemetry Dashboard** (`src/pages/Dashboard.tsx`) — Real-time tracking of mission parameters, vehicle states, and orbital mechanics calculations.
- **Ground Station Network Health** (`src/pages/NetworkHealth.tsx`) — Global antenna telemetry, carrier-to-noise ratio ($C/N_0$), and packet error rate diagnostics.
- **AI Anomaly Detection & Incident Analysis** (`src/pages/IncidentAnalysis.tsx`) — Automated telemetry parsing that detects thermal excursions, attitude drift, and power bus voltage drops.
- **Cinematic Interface** (`src/components/CursorTrail.tsx`) — Fluid atmospheric transitions, spatial coordinate HUDs, and tactical darkroom color grading.

---

## 🛠️ Project Structure

```text
ISRO/
├── public/                 # Static mission assets & aerospace imagery
├── src/
│   ├── components/         # Mission HUD primitives & telemetry cards
│   │   ├── AppLayout.tsx   # Command navigation & glassmorphic sidebar
│   │   └── CursorTrail.tsx # Atmospheric interactive particle trail
│   ├── data/               # Orbital ephemeris & simulated telemetry logs
│   ├── pages/              # Mission operations views
│   │   ├── Dashboard.tsx   # Primary flight telemetry overview
│   │   ├── NetworkHealth.tsx # Deep-space antenna tracking matrix
│   │   ├── AIIntelligence.tsx # Machine learning telemetry heuristic
│   │   └── IncidentAnalysis.tsx # Anomaly triage & RCA logs
│   ├── session.tsx         # Operator authentication & session state
│   └── App.tsx             # Mission router & global context providers
└── tailwind.config.js      # Custom aerospace slate & solar flare palette
```

---

## ⚡ Quickstart

```bash
# Clone repository
git clone https://github.com/Kishordiu/ISRO.git
cd ISRO

# Install dependencies
npm install  # or bun install

# Launch local mission command console
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to inspect the mission control interface.

---

<p align="center">
  <b>RESEARCH → BUILD → TEST → SHIP</b><br/>
  <sub>Engineered with pride by <a href="https://diufoundry.online">DIU Foundry</a> · K. Kishor Kumar</sub>
</p>
