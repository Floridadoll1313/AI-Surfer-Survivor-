.blog-container {
  width: 100%;
  color: #e8f7ff;
  animation: fadeIn 1.2s ease;
}

/* HERO */
.blog-hero {
  position: relative;
  height: 55vh;
  background: url("/images/blog-hero.jpg") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.blog-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 20, 40, 0.4),
    rgba(0, 10, 20, 0.85)
  );
  backdrop-filter: blur(2px);
}

.blog-title {
  position: relative;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 20px #00c8ff;
  z-index: 2;
}

.blog-subtitle {
  position: relative;
  font-size: 1.3rem;
  margin-top: 10px;
  opacity: 0.9;
  z-index: 2;
}

/* FEATURED */
.featured-section {
  padding: 60px 5%;
}

.featured-card {
  background: rgba(0, 40, 70, 0.5);
  border: 1px solid rgba(0, 180, 255, 0.3);
  border-radius: 16px;
  padding: 40px;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.2);
}

.featured-content h3 {
  font-size: 2rem;
  margin-bottom: 15px;
  text-shadow: 0 0 10px #00baff;
}

.read-more-btn {
  margin-top: 15px;
  background: #00baff;
  color: #00121f;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.read-more-btn:hover {
  background: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.5);
}

/* BLOG GRID */
.blog-grid-section {
  padding: 60px 5%;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.blog-card {
  background: rgba(0, 40, 70, 0.5);
  padding: 25px;
  border-radius: 14px;
  border: 1px solid rgba(0, 180, 255, 0.3);
  backdrop-filter: blur(6px);
  transition: 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 20px rgba(0, 180, 255, 0.4);
}

.card-btn {
  margin-top: 12px;
  background: #00baff;
  color: #00121f;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.card-btn:hover {
  background: #00d4ff;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);
}

/* ANIMATIONS */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
