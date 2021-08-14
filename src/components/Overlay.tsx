import React, { useState, useEffect } from 'react';

import css from './Overlay.module.scss';

interface Edit {
  name: string;
  thumbnail: string;
  url: string;
  index: number;
}

interface Props {
  show: boolean;
  action: string;
  closeOverlay: (e: React.MouseEvent) => void;
  handleAddBookmark: (name: string, thumbnail: string, url: string) => void;
  handleEditBookmark: (index: number, name: string, thumbnail: string, url: string) => void;
  edit?: Edit;
}

function Overlay({ show, action, closeOverlay, handleAddBookmark, handleEditBookmark, edit }: Props) {
  const [favicon, setFavicon] = useState({ url: '', letter: '' });
  const [input, setInput] = useState({ name: '', url: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.name) {
      setFavicon({ ...favicon, letter: '' });
      return;
    }
    const letter = input.name.charAt(0).toUpperCase();
    setFavicon({ ...favicon, letter });
  }, [input.name]);

  useEffect(() => {
    if (!show) {
      setFavicon({ url: '', letter: '' });
      setInput({ name: '', url: '' });
      setError('');
    } else {
      if (action === 'edit') {
        if (edit) {
          setInput({ name: edit.name, url: edit.url });
          setFavicon({ ...favicon, url: edit.thumbnail });
        }
      }
    }
  }, [show]);

  function handleFavicon() {
    let url = input.url;
    if (!url) {
      setFavicon({ ...favicon, url: '' });
      return;
    }

    url = url.replace(/(^\w+:|^)\/\//, '');
    url = url.replace('www.', '');
    url = url.split('/')[0];
    url = 'https://www.google.com/s2/favicons?sz=48&domain_url=' + url;

    const image = new Image();
    image.src = url;

    image.addEventListener('load', () => {
      let letter = favicon.letter;
      if (image.width !== 48) {
        url = '';
        if (!input.name) {
          letter = '?';
        }
      }
      setFavicon({ letter, url });
    });
  }

  function saveBookmark() {
    let name = input.name;
    let url = input.url;
    let thumbnail = favicon.url;
    if (!name && !url) {
      setError('Please enter a name and a URL.');
      return;
    } else if (!name) {
      setError('Please enter a name.');
      return;
    } else if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setError('');
    if (!url.includes('://')) url = 'https://' + url;
    if (action === 'add') {
      handleAddBookmark(name, thumbnail, url);
    } else if (action === 'edit') {
      const index = edit?.index ?? 0;
      handleEditBookmark(index, name, thumbnail, url);
    }
  }

  return (
    <>
      {show && (
        <main className={css.overlay}>
          <section className={css.wrapper}>
            <i className={`material-icons ${css.close}`} onClick={closeOverlay}>
              close
            </i>
            {(action === 'add' || action === 'edit') && (
              <>
                {action === 'add' && <h1>Add Bookmark</h1>}
                {action === 'edit' && <h1>Edit Bookmark</h1>}
                <section className={css.addBookmark}>
                  <div className={css.favicon}>
                    {favicon.url && <img src={favicon.url} alt="Favicon" />}
                    {!favicon.url && (
                      <div>
                        <span>{favicon.letter}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={input.name}
                      onChange={(e) => {
                        setInput({ ...input, name: e.target.value });
                        setError('');
                      }}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={input.url}
                      onChange={(e) => {
                        setInput({ ...input, url: e.target.value });
                        setError('');
                      }}
                      onBlur={handleFavicon}
                    />
                  </div>
                </section>
                <section className={css.buttons}>
                  {error && (
                    <span>
                      <i className="material-icons">error</i>
                      {error}
                    </span>
                  )}
                  <button onClick={closeOverlay}>Cancel</button>
                  <button onClick={saveBookmark}>Save</button>
                </section>
              </>
            )}
            {action === 'settings' && <h1>Settings</h1>}
          </section>
        </main>
      )}
    </>
  );
}

export default Overlay;
