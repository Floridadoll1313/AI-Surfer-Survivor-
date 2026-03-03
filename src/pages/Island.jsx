.island-container {
  width: 100%;
  color: #e8f7ff;
  animation: fadeIn 1.2s ease;
}

/* HERO */
.island-hero {
  position: relative;
  height: 55vh;
  background: url("/images/island-hero.jpg") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.island-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 20, 40, 0.4),
    rgba(0, 10, 20, 0.85)
  );
  backdrop-filter: blur(2px);
}

.island-title {
  position: relative;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 20px #00c8ff;
  z-index: 2;
}

.island-subtitle {
  position: relative;
  font-size: 1.3rem;
  margin-top: 10px;
  opacity: 0.9;
  z-index: 2;
}

/* GRID */
.island-grid-section {
  padding: 60px 5%;
}

.section-title {
  font-size: 2.4rem;
  margin-bottom: 25px;
  text-align: center;
  text-shadow: 0 0 10px #009dff;
}

.island-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.island-card {
  background: rgba(0, 40, 70, 0.5);
  padding: 25px;
  border-radius: 14px;
  border: 1px solid rgba(0, 180, 255, 0.3);
  backdrop-filter: blur(6px);
  transition: 0.3s ease;
}

.island-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.4);
}

/* CTA */
.island-cta {
  padding: 80px 5%;
  text-align: center;
  background: radial-gradient(circle at center, #001a2c, #000a12);
}

.cta-title {
  font-size: 2.6rem;
  margin-bottom: 15px;
  text-shadow: 0 0 12px #00baff;
}

.cta-desc {
  font-size: 1.2rem;
  opacity: 0.85;
  margin-bottom: 30px;
}

.cta-button {
  background: #00baff;
  color: #00121f;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.cta-button:hover {
  background: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
}

/* ANIMATIONS */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
