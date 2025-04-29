import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const targetDate = new Date(2025, 4, 31, 23, 59, 59); // Mayo (mes 4)

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const isExpired = Object.keys(timeLeft).length === 0;

  return (
    <div className="countdown">
      {isExpired ? (
        <span>¡Tiempo terminado!</span>
      ) : (
        Object.keys(timeLeft).map((interval) => (
          <span key={interval}>
            {timeLeft[interval]} {interval}{' '}
          </span>
        ))
      )}
    </div>
  );
};

export default Countdown;
