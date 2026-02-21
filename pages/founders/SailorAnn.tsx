tsx
import React from "react";
import { FounderLayout } from "../../components/FounderLayout";
import { FounderImageRow } from "../../components/FounderImageRow";
import { FounderTextBlock } from "../../components/FounderTextBlock";

const SailorAnn: React.FC = () => {
  return (
    <FounderLayout title="Sailor Ann" subtitle="The Gentle Heart">
      <FounderImageRow
        images={[
          { src: "20260220_130443.jpg", alt: "Sailor Ann sitting" },
          { src: "20260220_130536.jpg", alt: "Sailor Ann resting" },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Sailor Ann</strong> is the quiet soul of the family, offering
          a steady and soft presence full of wisdom earned from miles on the
          road. She is proof that gentleness is its own kind of strength.
        </p>
        <blockquote>
          “When life forced us into the woods and parking lots… Sailor Ann
          reminded me to breathe.”
        </blockquote>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default SailorAnn;
`

