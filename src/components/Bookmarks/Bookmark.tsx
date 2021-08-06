import React from 'react';

import css from './Bookmark.module.scss';

interface Bookmark {
  name: string;
  thumbnail: string;
  url: string;
}

function handleClick(url: string) {
  window.open(url);
}

function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div onClick={() => handleClick(bookmark.url)} className={css.bookmark}>
      <img src={bookmark.thumbnail} alt="" />
      <span>{bookmark.name}</span>
    </div>
  );
}

export default Bookmark;
