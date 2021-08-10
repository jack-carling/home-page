import React from 'react';

import css from './ContextMenu.module.scss';

interface Props {
  x: number;
  y: number;
  name: string;
  closeContextMenu: (e: React.MouseEvent) => void;
  deleteBookmark: (e: React.MouseEvent) => void;
}

function ContextMenu({ x, y, name, closeContextMenu, deleteBookmark }: Props) {
  return (
    <main onClick={closeContextMenu} onContextMenu={closeContextMenu} className={css.contextMenu}>
      <section style={{ left: x, top: y }}>
        <ul>
          <li>Edit {name}</li>
          <li onClick={deleteBookmark}>Delete {name}</li>
        </ul>
      </section>
    </main>
  );
}

export default ContextMenu;
