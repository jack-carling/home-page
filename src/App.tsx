import React, { useState } from 'react';

import ContextMenu from './components/Bookmarks/ContextMenu';
import Time from './components/Time';
import Weather from './components/Weather';
import Bookmarks from './components/Bookmarks';
import Background from './components/Background';

import defaultBookmarks from './bookmarks.json';

function App() {
  const [bookmarks, setBookmarks] = useState(() => defaultBookmarks);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, name: '', index: 0 });

  function handleContextMenu(e: React.MouseEvent, name: string, key: number) {
    e.preventDefault();
    setContextMenu({ name, x: e.clientX, y: e.clientY, show: true, index: key });
  }

  function handleDelete() {
    const modified = [...bookmarks];
    modified.splice(contextMenu.index, 1);
    setBookmarks(modified);
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
          />
        )}
        <Time />
        <Weather />
        <Bookmarks bookmarks={bookmarks} handleRightClick={handleContextMenu} />
      </main>
      <Background id={0} />
    </>
  );
}

export default App;
