import React, { useState } from 'react';

import Search from './Bookmarks/Search';
import Bookmark from './Bookmarks/Bookmark';

import css from './Bookmarks.module.scss';

interface BookmarkObj {
  name: string;
  thumbnail: string;
  url: string;
}

interface Props {
  bookmarks: BookmarkObj[];
  handleRightClick: (e: React.MouseEvent, name: string, key: number) => void;
}

function Bookmarks({ bookmarks, handleRightClick }: Props) {
  return (
    <section className={css.bookmarks}>
      <Search />
      <section className={css.wrapper}>
        {bookmarks.map((bookmark, index) => (
          <Bookmark
            bookmark={bookmark}
            key={index}
            handleRightClick={(e, name) => {
              const key = index;
              handleRightClick(e, name, key);
            }}
          />
        ))}
      </section>
    </section>
  );
}

export default Bookmarks;
