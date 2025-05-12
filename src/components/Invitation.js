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
      <p>🗓️ Fecha: 31 de mayo de 2025</p>

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
          🏁 <strong>El cumpleañero te espera en:</strong><br />
          336 Av. Guardia Civil Sur<br />
          📍 ¡No faltes!
        </div>
      )}

      {showMap && (
        <div className="map-container">
          <iframe
            title="Mapa ubicación cumpleaños"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.785101110396!2d-77.00492899999999!3d-12.184604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c71e5e7e164f%3A0xabc1234567890!2sAv.%20Guardia%20Civil%20Sur%20336!5e0!3m2!1ses-419!2spe!4v1714400000000!5m2!1ses-419!2spe"
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
