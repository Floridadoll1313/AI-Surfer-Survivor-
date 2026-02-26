import React from "react";

const AchievementBadge = ({ achievement }) => {
  return (
    <div
      className={`achievement-badge ${
        achievement.earned ? "earned" : "locked"
      }`}
    >
      {achievement.label}

      <style jsx>{`
        .achievement-badge {
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          font-size: 1rem;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .earned {
          background: rgba(56, 189, 248, 0.2);
          color: #7dd3fc;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }

        .locked {
          background: rgba(15, 23, 42, 0.4);
          color: #64748b;
        }
      `}</style>
    </div>
  );
};

export default AchievementBadge;
