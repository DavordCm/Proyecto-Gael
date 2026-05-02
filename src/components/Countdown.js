import React, { useEffect, useState } from 'react';

const calculateTimeLeft = (target) => {
  const difference = +target - +new Date();
  if (difference <= 0) return {};
  return {
    días: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
};

const Countdown = ({ targetDate }) => {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = Object.keys(timeLeft).length === 0;

  return (
    <div className="countdown" aria-live="polite">
      {isExpired ? (
        <span className="countdown-expired">¡La carrera ya empezó! 🏁</span>
      ) : (
        Object.keys(timeLeft).map((interval) => (
          <span className="countdown-cell" key={interval}>
            <strong>{timeLeft[interval]}</strong>
            <small>{interval}</small>
          </span>
        ))
      )}
    </div>
  );
};

export default Countdown;
