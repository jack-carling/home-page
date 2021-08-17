import React, { useState, useEffect } from 'react';

import ContextMenu from './components/Bookmarks/ContextMenu';
import Time from './components/Time';
import Weather from './components/Weather';
import Bookmarks from './components/Bookmarks';
import Background from './components/Background';
import Overlay from './components/Overlay';

import defaultBookmarks from './bookmarks.json';

interface BookmarkObj {
  name: string;
  thumbnail: string;
  url: string;
}

function App() {
  let bookmarksStorage = localStorage.bookmarks;
  if (!bookmarksStorage) {
    bookmarksStorage = defaultBookmarks;
  } else {
    bookmarksStorage = JSON.parse(localStorage.bookmarks);
  }

  let backgroundStorage = localStorage.background;
  if (!backgroundStorage) {
    backgroundStorage = 0;
  } else {
    backgroundStorage = JSON.parse(localStorage.background);
  }

  const [bookmarks, setBookmarks] = useState(() => bookmarksStorage);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, name: '', index: 0 });
  const [overlay, setOverlay] = useState({ show: false, action: '' });
  const [edit, setEdit] = useState({ index: 0, name: '', thumbnail: '', url: '' });
  const [background, setBackground] = useState(() => backgroundStorage);

  useEffect(() => {
    localStorage.bookmarks = JSON.stringify(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    localStorage.background = JSON.stringify(background);
  }, [background]);

  function handleContextMenu(e: React.MouseEvent, name: string, key: number) {
    e.preventDefault();
    setContextMenu({ name, x: e.clientX, y: e.clientY, show: true, index: key });
  }

  function handleDelete() {
    const modified = [...bookmarks];
    modified.splice(contextMenu.index, 1);
    setBookmarks(modified);
  }

  function handleEdit() {
    const index = contextMenu.index;
    const name = bookmarks[index].name;
    const thumbnail = bookmarks[index].thumbnail;
    const url = bookmarks[index].url;
    setEdit({ index, name, thumbnail, url });
    setOverlay({ action: 'edit', show: true });
  }

  function handleOverlay(e: React.MouseEvent, action: string) {
    setOverlay({ action, show: true });
  }

  return (
    <>
      <main className="App">
        {contextMenu.show && (
          <ContextMenu
            name={contextMenu.name}
            x={contextMenu.x}
            y={contextMenu.y}
            closeContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ ...contextMenu, show: false });
            }}
            deleteBookmark={handleDelete}
            editBookmark={handleEdit}
          />
        )}
        <Time />
        <Weather />
        <Bookmarks handleMenu={handleOverlay} bookmarks={bookmarks} handleRightClick={handleContextMenu} />
      </main>
      <Background id={background} />
      <Overlay
        handleAddBookmark={(name, thumbnail, url) => {
          setBookmarks((bookmarks: BookmarkObj[]) => [...bookmarks, { name, thumbnail, url }]);
          setOverlay({ ...overlay, show: false });
        }}
        handleEditBookmark={(index, name, thumbnail, url) => {
          setBookmarks((bookmarks: BookmarkObj[]) => {
            const all = [...bookmarks];
            all[index].name = name;
            all[index].thumbnail = thumbnail;
            all[index].url = url;
            return all;
          });
          setOverlay({ ...overlay, show: false });
        }}
        closeOverlay={() => setOverlay({ ...overlay, show: false })}
        edit={edit}
        {...overlay}
        handleBackground={(id) => setBackground(id)}
      />
    </>
  );
}

export default App;
