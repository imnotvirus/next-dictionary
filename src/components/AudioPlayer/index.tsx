import { Pause, Play } from "phosphor-react";
import React, { useRef, useState } from "react";
import { Main } from "../../styles/components/audioPlayer";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);
  const currentTimeDisplay = useRef<HTMLDivElement>(null);

  const play = () => {
    if (playerRef.current) {
      playerRef.current.load();

      if (isPlaying) {
        playerRef.current.pause();
        setIsPlaying(false);
      } else {
        playerRef.current?.play();
        setIsPlaying(true);
      }
    }
  };

  const onTileUpdate = () => {
    if (playerRef.current && currentTimeDisplay.current) {
      const { duration, currentTime } = playerRef.current;

      const progress = (currentTime / duration) * 100;

      currentTimeDisplay.current.style.width = `${progress}%`;
      if (progress === 100) {
        setIsPlaying(false);
      }
    }
  };
  return (
    <Main>
      <button onClick={play}>
        {!isPlaying ? (
          <Play size={30} color="white" />
        ) : (
          <Pause size={30} color="white" />
        )}
      </button>

      <div>
        <div ref={currentTimeDisplay}></div>
      </div>
      <audio ref={playerRef} onTimeUpdate={onTileUpdate}>
        <source src={src} type="audio/mpeg" />
      </audio>
    </Main>
  );
};

export default AudioPlayer;
