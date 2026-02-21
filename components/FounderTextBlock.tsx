`tsx
import React from "react";

interface FounderTextBlockProps {
  children: React.ReactNode;
}

export const FounderTextBlock: React.FC<FounderTextBlockProps> = ({
  children,
}) => {
  return <section className="founder-text-block">{children}</section>;
};
`

