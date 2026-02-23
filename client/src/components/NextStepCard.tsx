import React from "react";

const NextStepCard = () => {
  return (
    <div className="next-step-card fade-in">
      <h3>Your Next Step</h3>
      <p>
        Continue your journey by entering <strong>Sector 3: The Tideforge</strong>.
        Your path is unfolding.
      </p>

      <style jsx>{`
        .next-step-card {
          padding: 2rem;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.3);
          max-width: 600px;
          margin: 0 auto 4rem auto;
        }

        h3 {
          color: #7dd3fc;
          margin-bottom: 0.5rem;
        }

        p {
          color: #e0f2fe;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default NextStepCard;
