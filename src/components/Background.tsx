import React from 'react';

import css from './Background.module.scss';

interface Props {
  id: number;
}

function Background({ id }: Props) {
  const image = `/src/backgrounds/background_${id}.jpg`;
  return <section className={css.background} style={{ backgroundImage: `url(${image})` }}></section>;
}

export default Background;
