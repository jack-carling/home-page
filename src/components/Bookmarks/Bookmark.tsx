import React, { useRef } from 'react';

import css from './Bookmark.module.scss';

interface Bookmark {
  name: string;
  thumbnail: string;
  url: string;
}

interface Props {
  bookmark: Bookmark;
  handleRightClick: (e: React.MouseEvent, name: string) => void;
}

function handleClick(url: string) {
  window.open(url);
}

function Bookmark({ bookmark, handleRightClick }: Props) {
  const div = useRef<HTMLDivElement>(null);

  function getFirstLetter() {
    return bookmark.name.charAt(0).toUpperCase();
  }

  return (
    <div
      ref={div}
      onClick={() => handleClick(bookmark.url)}
      onContextMenu={(e) => handleRightClick(e, bookmark.name)}
      className={css.bookmark}
    >
      {bookmark.thumbnail && <img src={bookmark.thumbnail} alt="" />}
      {!bookmark.thumbnail && <div className={css.thumbnail}>{getFirstLetter()}</div>}
      <span>{bookmark.name}</span>
    </div>
  );
}

export default Bookmark;
