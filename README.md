# PulsePath-AI
## Introduction:
Create a modern, responsive web application called “AI Ambulance Traffic Clearance System” designed as a smart city emergency response solution.

---

🚑 Core Concept:

The system helps ambulances reach hospitals faster using AI-assisted route optimization, predictive delay analysis, and real-time traffic alert simulation. It prioritizes emergency types and ensures navigation even in low or no internet conditions.

---

🌐 Pages & Features:

1. Landing Page:

- Tagline: “Saving Lives with AI-Powered Smart Routing”
- Animated ambulance moving through traffic
- CTA buttons: “Start Simulation” and “View Demo”
- Brief explanation of system impact

---

2. Simulation Dashboard:

Input Panel:

- Emergency Type Dropdown:
  
  - Accident
  - Heart Attack
  - Organ Transport
  - Pregnancy

- Pickup Location

- Destination Hospital

---

Map Display:

- Integration with Google Maps API
- Show:
  - Optimized route
  - Live/simulated traffic (green, yellow, red)
  - Moving ambulance animation
  - Estimated Time of Arrival (ETA)

---

3. AI Decision Engine (Smart Classification Logic):

Map emergency type to priority:

- Organ Transport
  → Ultra-critical (90–100)
  → Fastest route only
  → Alerts to all checkpoints

- Heart Attack
  → High priority (75–90)
  → Fastest optimized route
  → Alerts to most traffic zones

- Accident
  → Medium priority (60–75)
  → Balanced route
  → Alerts only in congested zones

- Pregnancy
  → Moderate priority (50–60)
  → Optimal route
  → Minimal alerts

---

Explainable AI Panel:

Show real-time reasoning:

- “Emergency: Heart Attack → High Priority Routing”
- “Traffic Alerts Sent: 5 Zones”
- “ETA Reduced by 12%”

---

4. Predictive Delay Analysis:

Feature:

Display:

- “⏱ Predicted Delay in Next 5 Minutes”

Logic:

- Uses:
  - Current traffic
  - Historical/mock data
  - Time-based patterns

Behavior:

- High delay → Suggest alternate route
- Medium → Monitor
- Low → Continue

UI:

- Color indicators:
  - Red (High)
  - Orange (Medium)
  - Green (Low)

---

5. Traffic Alert System:

- Simulated checkpoints on map
- Trigger alerts:
  “🚨 Ambulance Incoming – Clear Route”

Based on Emergency:

- Organ Transport → All checkpoints
- Heart Attack → High + Medium zones
- Accident → High congestion only
- Pregnancy → Only severe traffic

---

6. Live Tracking System:

- Animated ambulance movement
- Real-time position updates
- Countdown timer to hospital

---

7. Hospital Notification Panel:

- Display:
  “Incoming Emergency Patient – Prepare Immediately”
- Show ETA

---

8. Offline Fallback Routing System:

Connectivity Modes:

- 🟢 Online
- 🟡 Low Connectivity
- 🔴 Offline

---

Routing Behavior:

- Online → Live data via Google Maps API
- Low signal → Cached routes + last traffic data
- Offline → Pre-stored shortest routes

---

Features:

- Cached hospital routes
- Predefined traffic zones
- Alert queue system (send when reconnected)

---

UI Indicator:

- Banner:
  “⚠️ Offline Mode – Using Cached Routes”

---

Recovery:

- Auto-switch to online mode
- Recalculate route dynamically

---

9. UI/UX Design:

- Dark futuristic theme
- Neon highlights
- Glassmorphism cards
- Smooth animations (Framer Motion)
- Fully responsive design

---

10. Emergency Visualization:

- Icons:
  
  - 🚑 Accident
  - ❤️ Heart Attack
  - 🫀 Organ Transport
  - 🤰 Pregnancy

- Color coding:
  
  - Red → Organ Transport
  - Dark Orange → Heart Attack
  - Orange → Accident
  - Yellow → Pregnancy

---

11. Analytics Dashboard:

Display:

- Time saved
- Distance optimized
- Simulated lives impacted

---

12. Deployment & Future Scope:

Display section:

“This solution requires collaboration with city authorities and smart traffic infrastructure for real-world deployment.”

---

Include:

- Integration with traffic signals
- Coordination with emergency services
- Smart signal automation
- Centralized monitoring system

---

13. Tech Stack:

- Frontend: React + Tailwind CSS
- Backend (optional): Node.js
- Maps: Google Maps API
- Use mock/simulated data where needed

---

14. Output Requirement:

Generate complete frontend code with:

- Interactive UI components
- Map visualization
- Simulation logic
- Animations

Focus on a visually impressive, interactive hackathon demo rather than full backend integration.

---

15.🌐 Live Website
👉https://25a31a4357.github.io/PulsePath-AI/
