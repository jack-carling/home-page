import React from 'react';

import Search from './Bookmarks/Search';
import Bookmark from './Bookmarks/Bookmark';

import css from './Bookmarks.module.scss';

interface Bookmarks {
  name: string;
  thumbnail: string;
  url: string;
}

function Bookmarks({ bookmarks }: { bookmarks: Bookmarks[] }) {
  console.log(bookmarks);

  return (
    <section className={css.bookmarks}>
      <Search />
      <section className={css.wrapper}>
        {bookmarks.map((bookmark, index) => (
          <Bookmark bookmark={bookmark} key={index} />
        ))}
      </section>
    </section>
  );
}

export default Bookmarks;
