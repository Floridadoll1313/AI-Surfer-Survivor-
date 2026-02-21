tsx
import React from "react";
import { FounderLayout } from "../../components/FounderLayout";
import { FounderImageRow } from "../../components/FounderImageRow";
import { FounderTextBlock } from "../../components/FounderTextBlock";

const ShannonFounder: React.FC = () => {
  return (
    <FounderLayout
      title="Shannon Cahoon Foster"
      subtitle="The Architect of the Never Ending Realm"
    >
      <FounderImageRow
        images={[
          { src: "GlanceAi_6606.png", alt: "Paddleboard on the ocean" },
          { src: "GlanceAi_93516616.png", alt: "Transparent kayak at sunset" },
          { src: "GlanceAi_2104946656.png", alt: "Twilight sanctuary" },
        ]}
      />

      <FounderTextBlock>
        <p>
          Shannon walks the line between survival and creation — shaping a realm
          from the miles, the waters, and the quiet moments where the world
          cracked open and something mythic stepped through.
        </p>
        <p>
          The Architect does not simply build. The Architect remembers. The
          Architect maps. The Architect transforms.
        </p>
      </FounderTextBlock>
    </FounderLayout>
  );
};

export default ShannonFounder;
`
