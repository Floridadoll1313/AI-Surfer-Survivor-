tsx
import React from "react";
import { FounderLayout } from "../../components/FounderLayout";
import { FounderImageRow } from "../../components/FounderImageRow";
import { FounderTextBlock } from "../../components/FounderTextBlock";

const StormyGray: React.FC = () => {
  return (
    <FounderLayout title="Stormy Gray" subtitle="The Protector">
      <FounderImageRow
        images={[
          {
            src: "65ad77bb-8dac-4a4e-8409-e78175401b1f-1all5330.jpg",
            alt: "Stormy Gray resting",
          },
          {
            src: "65ad77bb-8dac-4a4e-8409-e78175401b1f-1all5332.jpg",
            alt: "Stormy Gray lying down",
          },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Stormy Gray</strong> is a survivor who serves as a loyal
          shield through every dark night and long stretch of road. People may
          misunderstand her intensity, but she is vigilant, not violent.
        </p>
        <p>
          She is courage wrapped in fur — the heartbeat that kept the story
          moving when there was nothing left.
        </p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default StormyGray;
`

