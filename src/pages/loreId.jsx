import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import loreData from "../../data/loreData";
import "../../styles/animations.css";

const LoreEntry: React.FC = () => {
  const router = useRouter();
  const { loreId } = router.query;

  const entry = loreData.find((e) => e.slug === loreId);

  if (!entry) {
    return (
      <Layout>
        <div className="page-container">
          <h1 className="hero-title">Lore Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container fade-in">
        <h1 className="hero-title glow-pulse">{entry.title}</h1>

        <div className="lore-content">
          <p>{entry.content}</p>
        </div>

        <style jsx>{`
          .lore-content {
            margin-top: 2rem;
            padding: 2rem;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 12px;
            color: #e0f2fe;
            line-height: 1.6;
            white-space: pre-line;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default LoreEntry;
