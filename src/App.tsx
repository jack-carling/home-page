import React from 'react';

import Time from './components/Time';
import Background from './components/Background';

function App() {
  return (
    <main className="App">
      <Time />
      <Background id={0} />
    </main>
  );
}

export default App;
