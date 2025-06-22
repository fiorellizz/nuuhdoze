import React, { useContext, useRef } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-carousel-wrapper'>
        <button className='scroll-button left' onClick={scrollLeft}>‹</button>

        <div className='explore-menu-list' ref={scrollRef}>
          {menu_list.map((item, index) => (
            <div
              key={index}
              className='explore-menu-list-item'
              onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={category === item.menu_name ? 'active' : ''}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        <button className='scroll-button right' onClick={scrollRight}>›</button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
