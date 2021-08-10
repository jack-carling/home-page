import React, { useState } from 'react';

import Search from './Bookmarks/Search';
import Bookmark from './Bookmarks/Bookmark';
import Menu from './Bookmarks/Menu';

import css from './Bookmarks.module.scss';

interface BookmarkObj {
  name: string;
  thumbnail: string;
  url: string;
}

interface Props {
  bookmarks: BookmarkObj[];
  handleRightClick: (e: React.MouseEvent, name: string, key: number) => void;
  handleMenu: (e: React.MouseEvent, action: string) => void;
}

function Bookmarks({ bookmarks, handleRightClick, handleMenu }: Props) {
  return (
    <section className={css.bookmarks}>
      <article className={css.bookmarks}>
        <Search />
        <Menu handleMenu={(e, action) => handleMenu(e, action)} />
      </article>
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
