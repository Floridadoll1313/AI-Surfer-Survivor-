import React from "react";
import FounderLayout from "./components/FounderLayout";
import FounderImageRow from "./components/FounderImageRow";
import FounderTextBlock from "./components/FounderTextBlock";
import FoundersNav from "./components/FoundersNav";

const SkyMarlin: React.FC = () => {
  return (
    <FounderLayout title="Sky Marlin" role="The Little Captain">
      <FoundersNav />

      <FounderImageRow
        images={[
          { src: "/20260220_131307.jpg", alt: "Sky Marlin in the tent" },
          {
            src: "/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5331.jpg",
            alt: "Sky Marlin walking",
          },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Sky Marlin</strong> may be small, but she is pure fire and joy.
          She rides in the wagon like royalty — ears perked, eyes bright,
          trusting completely as we move from place to place.
        </p>

        <p>
          She’s the spark that kept us laughing even on the hardest days. When we
          were exhausted, Sky would curl up in the wagon and look at me like,
          “We’ve got this.” And somehow, we always did.
        </p>

        <p>
          She is the light in our darkest chapters — the little captain who kept
          our spirits alive.
        </p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default SkyMarlin;
