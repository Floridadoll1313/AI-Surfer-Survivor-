import React from "react";
import FounderLayout from "./components/FounderLayout";
import FounderImageRow from "./components/FounderImageRow";
import FounderTextBlock from "./components/FounderTextBlock";

const StormyGray: React.FC = () => {
  return (
    <FounderLayout title="Stormy Gray" role="The Protector">
      <FounderImageRow
        images={[
          {
            src: "/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5330.jpg",
            alt: "Stormy Gray resting",
          },
          {
            src: "/65ad77bb-8dac-4a4e-8409-e78175401b1f-1_all_5332.jpg",
            alt: "Stormy Gray lying down",
          },
        ]}
      />

      <FounderTextBlock>
        <p>
          <strong>Stormy Gray</strong> is my shield — loyal, alert, and fiercely
          loving. She has walked beside me through every dark night, every long
          stretch of road, every moment where I didn’t know what tomorrow would
          bring.
        </p>

        <p>
          People misunderstand her sometimes. They see her intensity and think
          she’s an “attack dog.” But Stormy isn’t violent — she’s vigilant. She’s
          a survivor, just like me.
        </p>

        <p>
          When we were abandoned at that gas station… when we slept in the
          woods… when we walked for hours with nothing but hope and a cart…
          Stormy stayed close, watching every sound, every shadow, every
          stranger.
        </p>

        <p>
          She is courage wrapped in fur. She is loyalty in motion. She is the
          heartbeat that kept me going when I had nothing left.
        </p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default StormyGray;