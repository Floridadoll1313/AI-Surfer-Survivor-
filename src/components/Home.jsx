import React from "react";
import Hero from "../components/Hero";
import SectorProgressCard from "../components/SectorProgressCard";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />

      <section className="sectors" data-reveal>
        <SectorProgressCard sector={1} />
        <SectorProgressCard sector={2} />
        <SectorProgressCard sector={3} />
      </section>
    </div>
  );
}
