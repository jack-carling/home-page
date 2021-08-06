import React from 'react';

import Time from './components/Time';
import Weather from './components/Weather';
import Bookmarks from './components/Bookmarks';
import Background from './components/Background';

function App() {
  return (
    <>
      <main className="App">
        <Time />
        <Weather />
        <Bookmarks />
      </main>
      <Background id={0} />
    </>
  );
}

export default App;
