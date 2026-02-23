import React from "react";
import Link from "next/link";

const SectorProgressCard = ({ sector }) => {
  return (
    <Link href={`/sector${sector.id}`} className="sector-card fade-in">
      <h3>{sector.name}</h3>
      <p>{sector.completed ? "Completed" : "Not Yet Completed"}</p>

      <style jsx>{`
        .sector-card {
          padding: 1.5rem;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.3);
          text-align: center;
          transition: 0.25s ease;
        }

        .sector-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
        }

        h3 {
          color: #7dd3fc;
          margin-bottom: 0.5rem;
        }

        p {
          color: #e0f2fe;
          opacity: 0.8;
        }
      `}</style>
    </Link>
  );
};

export default SectorProgressCard;
