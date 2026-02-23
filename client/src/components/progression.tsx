import React from "react";

interface Props {
  completed: number;
  total: number;
}

const ProgressRing: React.FC<Props> = ({ completed, total }) => {
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="progress-ring-container glow-pulse">
      <div className="progress-number">{percent}%</div>

      <style jsx>{`
        .progress-ring-container {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 6px solid rgba(56, 189, 248, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.4);
        }

        .progress-number {
          font-size: 2.4rem;
          color: #7dd3fc;
        }
      `}</style>
    </div>
  );
};

export default ProgressRing;
