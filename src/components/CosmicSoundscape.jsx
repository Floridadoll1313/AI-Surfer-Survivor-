
`tsx
import { useEffect, useRef } from "react";

function CosmicSoundscape() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.15;
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c0b7e4e4a.mp3?filename=deep-space-ambient-110397.mp3"
      loop
    />
  );
}

export default CosmicSoundscape;
`
