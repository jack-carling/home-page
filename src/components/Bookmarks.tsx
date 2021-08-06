import React from 'react';

import Search from './Bookmarks/Search';

import css from './Bookmarks.module.scss';

function Bookmarks() {
  return (
    <section className={css.bookmarks}>
      <Search />
    </section>
  );
}

export default Bookmarks;
