import React, { useRef } from 'react';
import '../styles/CarRace.css';

const Car = ({ color, audioSrc, play }) => {
  const audioRef = useRef(null);

  // Reproduce o pausa el audio según el valor de `play`
  React.useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(err =>
        console.warn(`Error al reproducir audio de ${color}:`, err)
      );
    } else if (audioRef.current) {
      audioRef.current.pause(); // Detener el audio si `play` es falso
      audioRef.current.currentTime = 0; // Reiniciar la posición del audio
    }
  }, [play, color]);

  return (
    <div className={`car car-${color}`}>
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />
      <div className="wheel front"></div>
      <div className="wheel rear"></div>
    </div>
  );
};

const CarRace = () => {
  const [raceStarted, setRaceStarted] = React.useState(false);

  const handleStartRace = () => {
    setRaceStarted(prevState => !prevState); // Alternar el estado de la carrera
  };

  return (
    <div className="race-track">
      <button className="start-btn" onClick={handleStartRace}>
        🏁 {raceStarted ? 'Detener carrera' : 'Iniciar carrera'}
      </button>

      <div className="track-lane">
        <Car color="red" audioSrc="/car-red.mp3" play={raceStarted} />
      </div>
      <div className="track-lane">
        <Car color="green" audioSrc="/car-green.mp3" play={raceStarted} />
      </div>
      <div className="track-lane">
        <Car color="blue" audioSrc="/car-purple.mp3" play={raceStarted} />
      </div>
    </div>
  );
};

export default CarRace;
