import React, { useState, useRef, useEffect } from 'react';

import css from './Search.module.scss';

type SearchEvent = React.MouseEvent | React.KeyboardEvent;

function Search() {
  const [input, setInput] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  function searchGoogle(e: SearchEvent) {
    if (e.type === 'keyup' && (e as React.KeyboardEvent).code !== 'Enter') return;
    window.open(`https://www.google.com/search?q=${input}`);
    setInput('');
  }

  return (
    <div className={css.search}>
      <input
        type="text"
        ref={searchInput}
        placeholder="Search Google"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyUp={searchGoogle}
      />
      <i className="material-icons" onClick={searchGoogle}>
        search
      </i>
    </div>
  );
}

export default Search;
