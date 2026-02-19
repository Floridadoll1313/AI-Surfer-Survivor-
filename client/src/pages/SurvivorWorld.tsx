/* --- CORE GRID & ATMOSPHERICS --- */
.survivor-world {
  position: relative;
  background: #050505;
  padding: 20px;
  border: 2px solid;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

/* --- NEON FLICKER ANIMATION --- */
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 5px #64ffda, 0 0 10px #64ffda, 0 0 20px #64ffda;
    opacity: 1;
  }
  20%, 22%, 24%, 55% {
    text-shadow: none;
    opacity: 0.5;
  }
}

.avatar-evolved {
  animation: neon-flicker 3s infinite;
}

/* --- BOSS PULSE & RED ALERT --- */
@keyframes boss-pulse {
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.5); box-shadow: 0 0 30px #ff0055; }
  100% { transform: scale(1); filter: brightness(1); }
}

.boss-mode {
  animation: red-alert-bg 1s infinite alternate;
}

@keyframes red-alert-bg {
  from { background-color: #050505; }
  to { background-color: #1a0008; }
}

.boss-core {
  animation: boss-pulse 0.8s ease-in-out infinite;
  box-shadow: 0 0 15px #ff0055;
}

/* --- WEATHER EFFECTS --- */
.weather-NEON_FOG {
  filter: saturate(0.5) contrast(1.2);
}

.weather-DATA_RAIN::after {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 200%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(100, 255, 218, 0.1) 3px,
    transparent 4px
  );
  animation: rain-scroll 0.5s linear infinite;
  pointer-events: none;
}

@keyframes rain-scroll {
  from { transform: translateY(0); }
  to { transform: translateY(50%); }
}

/* --- GLITCH & VICTORY --- */
@keyframes glitch-shake {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.victory-glow {
  animation: glitch-shake 0.2s infinite;
  background: white !important;
  color: black !important;
}

.cell {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cell:hover {
  background: rgba(100, 255, 218, 0.05);
}
