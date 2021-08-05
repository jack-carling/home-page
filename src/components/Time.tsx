import React, { useState, useEffect } from 'react';

import css from './Time.module.scss';

function Time() {
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className={css.time}>
      <h1 className={css.time}>{today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</h1>
      <span>{today.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
    </section>
  );
}

export default Time;
