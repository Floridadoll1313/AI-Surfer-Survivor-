tsx
import React from "react";
import { FounderLayout } from "../../components/FounderLayout";
import { FounderImageRow } from "../../components/FounderImageRow";
import { FounderTextBlock } from "../../components/FounderTextBlock";

const SkyMarlin: React.FC = () => {
  return (
    <FounderLayout title="Sky Marlin" subtitle="The Little Captain">
      <FounderImageRow
        images={[
          { src: "20260220_131307.jpg", alt: "Sky Marlin in the tent" },
          {
            src: "65ad77bb-8dac-4a4e-8409-e78175401b1f-1all5331.jpg",
            alt: "Sky Marlin walking",
          },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Sky Marlin</strong> is the spark that keeps laughter alive,
          even on the hardest days. Though small, she is full of personality and
          trust as she moves from place to place.
        </p>
        <p>
          She is the light in the darkest chapters — a tiny captain guiding the
          pack through miles of woods, back roads, and hidden places.
        </p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default SkyMarlin;
`
