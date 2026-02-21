import React from "react";
import FounderLayout from "./components/FounderLayout";
import FounderImageRow from "./components/FounderImageRow";
import FounderTextBlock from "./components/FounderTextBlock";

const SailorAnn: React.FC = () => {
  return (
    <FounderLayout title="Sailor Ann" role="The Gentle Heart">
      <FounderImageRow
        images={[
          { src: "/20260220_130443.jpg", alt: "Sailor Ann sitting" },
          { src: "/20260220_130536.jpg", alt: "Sailor Ann resting" },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Sailor Ann</strong> is the quiet soul of the family — steady,
          soft, and full of wisdom earned from miles on the road. She doesn’t
          rush. She doesn’t push. She simply walks at her own pace, and we follow
          her lead.
        </p>

        <p>
          When life forced us into the woods, into parking lots, into long days
          of walking with everything we owned in a cart, Sailor Ann reminded me
          to breathe. She’d look back at me with those soft eyes, as if to say,
          “We’ll get there. One step at a time.”
        </p>

        <p>
          She’s older now, and her body moves slower, but her spirit is strong.
          Every mile we walked together built her into the quiet anchor of our
          pack.
        </p>

        <p>Sailor Ann is proof that gentleness is its own kind of strength.</p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default SailorAnn;