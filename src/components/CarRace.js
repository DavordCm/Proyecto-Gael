import React from 'react';
import '../styles/CarRace.css';

const Car = ({ color }) => (
  <div className={`car car-${color}`}>
    <div className="wheel front"></div>
    <div className="wheel rear"></div>
  </div>
);

const CarRace = () => {
  return (
    <div className="race-track">
      <div className="track-lane">
        <Car color="red" />
      </div>
      <div className="track-lane">
        <Car color="green" />
      </div>
      <div className="track-lane">
        <Car color="blue" />
      </div>
    </div>
  );
};

export default CarRace;
