import React, { useState } from 'react';

import Time from './components/Time';
import Weather from './components/Weather';
import Bookmarks from './components/Bookmarks';
import Background from './components/Background';

import defaultBookmarks from './bookmarks.json';

function App() {
  const [bookmarks, setBookmarks] = useState(() => defaultBookmarks);

  return (
    <>
      <main className="App">
        <Time />
        <Weather />
        <Bookmarks bookmarks={bookmarks} />
      </main>
      <Background id={0} />
    </>
  );
}

export default App;
