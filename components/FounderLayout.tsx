import React from "react";

interface FounderLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const FounderLayout: React.FC<FounderLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="founder-layout">
      <header className="founder-hero">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </header>

      <main className="founder-content">{children}</main>
    </div>
  );
};
