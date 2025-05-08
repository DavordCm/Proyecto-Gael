import React from 'react';
import '../styles/CarRace.css';

const Car = ({ color, speed }) => {
  return (
    <div className={`car car-${color}`} style={{ animationDuration: speed }}>
      <div className="deco-light"></div>
      <div className="window"></div>
      <div className="wheel rear"></div>
      <div className="wheel front"></div>
    </div>
  );
};

const CarRace = () => {
  return (
    <div className="race-track">
      <div className="track-lane">
        <Car color="red" speed="3s" />
      </div>
      <div className="track-lane">
        <Car color="green" speed="4s" />
      </div>
      <div className="track-lane">
        <Car color="blue" speed="5s" />
      </div>
    </div>
  );
};

export default CarRace;
