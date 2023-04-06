import React, {useState, useMemo} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Logo from '../images/logo.svg';
import {HomeIcon, RestaurantIcon, HotelIcon, ActivityIcon, ScenicIcon} from '../components/Icon';
import {useTravelContext} from '../context';

const Header = () => {
  const navList = useMemo(()=>[
    {
      to: '/',
      icon: <HomeIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-white " />,
      text: '首頁',
    },
    {
      to: '/scenic',
      icon: <ScenicIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-white " />,
      text: '景點',
    },
    {
      to: '/restaurant',
      icon: (
        <RestaurantIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-white " />
      ),
      text: '餐飲',
    },
    {
      to: '/hotel',
      icon: <HotelIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-white " />,
      text: '旅宿',
    },
    {
      to: '/activity',
      icon: (
        <ActivityIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-white " />
      ),
      text: '活動',
    },
  ],[]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const {setSearchResult} = useTravelContext();

  const clearSearchResult = () => {
    setSearchResult([]);
  };

return (
  <div className="fixed top-0 z-20 w-full transition-all duration-300 bg-white shadow-sm md:block bg-opacity-90 backdrop-blur-sm">
    <header className="container">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <img className="w-8 h-8" src={Logo} />
            <h2 className="ml-2 text-primary">台灣GO嘍</h2>
          </div>
        </Link>
        <ul className="items-center justify-between hidden  md:flex">
          {navList.map((item, index) => (
            <LinkItem key={index} to={item.to}>
              {item.icon}
              {item.text}
            </LinkItem>
          ))}
        </ul>
        <div className="flex items-center md:hidden">
          <button
            className="p-2 ml-4 rounded-md md:hidden bg-gray-light hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
            onClick={handleMenuToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-dark hover:text-gray-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
          <ul className="items-center justify-between hidden ml-8 md:flex">
            {navList.map((item, index) => (
              <LinkItem key={index} to={item.to} onClick={clearSearchResult}>
                {item.icon}
                {item.text}
              </LinkItem>
            ))}
          </ul>
        </div>
      </nav>
      <ul
        className={`md:hidden absolute top-16 left-0 right-0 flex flex-col items-center gap-4 pt-4 pb-2 px-4 bg-white shadow-md rounded-b-lg transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {navList.map((item, index) => (
          <LinkItem key={index} to={item.to} onClick={handleMenuToggle}>
            {item.icon}
            {item.text}
          </LinkItem>
        ))}
      </ul>
    </header>
  </div>
);


  function LinkItem({children, to}) {
    const {setSearchResult} = useTravelContext();

    const clearSearchResult = () => {
      setSearchResult([]);
    };
    return (
      <li className="transition-all duration-500 ease-in-out group hover:bg-secondary">
        <NavLink
          to={to}
          className={({isActive}) =>
            isActive
              ? 'border-secondary border-b-2 fill-secondary text-secondary group-hover:text-white flex gap-2 transition duration-200 py-6 px-4'
              : 'flex gap-2 fill-primary text-primary transition duration-200 group-hover:text-white py-6 px-4'
          }
          onClick={clearSearchResult}
        >
          {children}
        </NavLink>
      </li>
    );
  }
};

export default Header;
