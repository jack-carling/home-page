import React from 'react';

import css from './Menu.module.scss';

interface Props {
  handleMenu: (e: React.MouseEvent, action: string) => void;
}

function Menu({ handleMenu }: Props) {
  return (
    <section className={css.menu}>
      <i className="material-icons" onClick={(e) => handleMenu(e, 'add')}>
        add_box
      </i>
      <i className="material-icons" onClick={(e) => handleMenu(e, 'settings')}>
        settings
      </i>
    </section>
  );
}

export default Menu;
