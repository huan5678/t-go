import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
import {
  HomeIcon,
  RestaurantIcon,
  HotelIcon,
  ActivityIcon,
  ScenicIcon,
} from "../components/Icon";
import { useTravelContext } from "../context";

const Header = () => {
  const navList = [
    {
      to: "/",
      icon: (
        <HomeIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "首頁",
    },
    {
      to: "/scenic",
      icon: (
        <ScenicIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "景點",
    },
    {
      to: "/restaurant",
      icon: (
        <RestaurantIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "餐飲",
    },
    {
      to: "/hotel",
      icon: (
        <HotelIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "旅宿",
    },
    {
      to: "/activity",
      icon: (
        <ActivityIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "活動",
    },
  ];

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm fixed top-0 z-20 transition-all duration-300 w-full shadow-sm">
      <header className="container">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center">
              <img className="w-8 h-8" src={Logo} />
              <h2 className="text-primary ml-2">台灣GO嘍</h2>
            </div>
          </Link>
          <ul className="flex justify-between items-center">
            {navList.map((item, index) => (
              <LinkItem key={index} to={item.to}>
                {item.icon}
                {item.text}
              </LinkItem>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );

  function LinkItem({ children, to }) {
    const { setSearchResult } = useTravelContext();

    const clearSearchResult = () => {
      setSearchResult([]);
    };
    return (
      <li className="group transition-all duration-500 ease-in-out hover:bg-secondary">
        <Link
          to={to}
          className="flex gap-2 text-primary transition duration-200 group-hover:text-white py-6 px-4"
          onClick={clearSearchResult}
        >
          {children}
        </Link>
      </li>
    );
  }
};

export default Header;
