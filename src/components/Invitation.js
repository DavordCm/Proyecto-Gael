import React, { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';
import CarRace from './CarRace';
import Confetti from 'react-confetti';
import '../styles/Invitation.css';

const Invitation = () => {
  const birthdayDate = '2025-05-15T15:00:00';
  const [showLocation, setShowLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [volume, setVolume] = useState(0.5); // volumen inicial al 50%

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]); // actualiza volumen cada vez que cambie

  return (
    <div className="invitation">
      {/* 🎵 Música de fondo */}
      <audio
        ref={audioRef}
        src="/HotWheels.mp3"
        autoPlay
        loop
      />

      <Confetti />
      <img src="/gael.jpg" alt="Cumpleañero Gael" className="avatar-img" />
      <h1>¡Estás invitado a mi cumpleaños!</h1>
      <h2>🎉 ¡Será una carrera Hot Wheels épica! 🏁</h2>
      <p>👦 Cumpleañero: <strong>Gael</strong></p>
      <p>🗓️ Fecha: 31 de mayo de 2025 - 🕕 Hora: 6:00 pm</p>

      {/* 🔊 Control de volumen */}
      <div style={{ margin: '20px 0' }}>
        <label style={{ fontWeight: 'bold' }}>🔊 Volumen: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: '200px', verticalAlign: 'middle' }}
        />
        <span style={{ marginLeft: '10px' }}>{Math.round(volume * 100)}%</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setShowLocation(!showLocation)} className="location-btn">
          {showLocation ? 'Ocultar Lugar' : '¿Dónde es la carrera?'}
        </button>

        {showLocation && (
          <button onClick={() => setShowMap(!showMap)} className="map-btn location-btn">
            {showMap ? 'Ocultar mapa' : 'Ver mapa'}
          </button>
        )}
      </div>

      {showLocation && (
        <div className="location-box">
          🏁 <strong>El cumpleañero te espera en:</strong>
          <br />buenos aires de villa Mz 44 lt12 chorrillos<br />
          📍 ¡No faltes!
        </div>
      )}

      {showMap && (
        <div className="map-container">
          <iframe
            title="Mapa ubicación cumpleaños"
            src="https://www.google.com/maps/embed?pb=!4v1748654004255!6m8!1m7!1sRxVIM7OFI8rLRSIrQo1fOA!2m2!1d-12.18859419911167!2d-76.99979579504422!3f283.12500616179625!4f-30.508168153515328!5f0.7820865974627469"
            width="100%"
            height="300"
            style={{ border: '2px solid orange', borderRadius: '10px', marginTop: '10px' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      )}

      <Countdown targetDate={birthdayDate} />
      <CarRace />
    </div>
  );
};

export default Invitation;
