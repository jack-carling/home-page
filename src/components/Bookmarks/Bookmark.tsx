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

  return (
    <div
      ref={div}
      onClick={() => handleClick(bookmark.url)}
      onContextMenu={(e) => handleRightClick(e, bookmark.name)}
      className={css.bookmark}
    >
      <img src={bookmark.thumbnail} alt="" />
      <span>{bookmark.name}</span>
    </div>
  );
}

export default Bookmark;
