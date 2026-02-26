/* Global wrapper */
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #00111a 0%, #002b3d 50%, #000000 100%);
  color: white;
  font-family: "Poppins", sans-serif;
}

/* Header */
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.logo {
  font-size: 1.6rem;
  font-weight: 700;
  color: #00eaff;
  text-shadow: 0 0 8px #00eaff;
}

/* Navigation */
.layout-nav a {
  margin-left: 20px;
  color: #b8faff;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s ease;
}

.layout-nav a:hover {
  color: white;
  text-shadow: 0 0 10px #00eaff;
}

/* Main content */
.layout-content {
  flex: 1;
  padding: 30px;
}

/* Footer */
.layout-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  color: #88ddee;
}
