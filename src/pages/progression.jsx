    {/* PROGRESS RING */}
    <div style={{ marginBottom: "3rem" }}>
      <ProgressRing
        completed={sectors.filter((s) => s.completed).length}
        total={sectors.length}
      />
    </div>

    {/* SECTOR PROGRESS */}
    <h2 className="section-title">Sector Progress</h2>
    <div className="sector-grid">
      {sectors.map((sector) => (
        <SectorProgressCard key={sector.id} sector={sector} />
      ))}
    </div>

    {/* ACHIEVEMENTS */}
    <h2 className="section-title">Achievements</h2>
    <div className="achievement-grid">
      {achievements.map((ach) => (
        <AchievementBadge key={ach.id} achievement={ach} />
      ))}
    </div>

    {/* NEXT STEP */}
    <NextStepCard />
  </div>

  <style jsx>{`
    .page-container {
      padding: 3rem 2rem;
      text-align: center;
    }

    .section-title {
      margin-top: 3rem;
      margin-bottom: 1rem;
      font-size: 1.8rem;
      color: #7dd3fc;
    }

    .sector-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .achievement-grid {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
  `}</style>
</Layout>


);
};

export default Progression;