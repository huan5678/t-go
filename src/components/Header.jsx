import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
import {
  HomeIcon,
  RestaurantIcon,
  HotelIcon,
  ActivityIcon,
  CollectionIcon,
  LoginIcon,
  ScenicIcon,
} from "../components/Icon";

const Header = () => {
  const [headerHeight, setHeaderHeight] = useState("0%");
  const [lastScroll, setLastScroll] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);

  const headerStyle = {
    transform: `translateY(${headerHeight})`,
  };

  useEffect(() => {
    window.addEventListener("scroll", function () {
      setCurrentScroll(window.pageYOffset);

      if (currentScroll <= 0) {
        setHeaderHeight("0%");
        return;
      }

      // 當前捲軸位置大於上一次捲軸位置 且 header目前顯示
      if (currentScroll > lastScroll && headerHeight === "0%") {
        setHeaderHeight("-100%");
      }
      // 當前捲軸位置小於上一次捲軸位置 且 header已經收起來
      else if (currentScroll < lastScroll && headerHeight === "-100%") {
        setHeaderHeight("0%");
      }
      // 更新上一次捲軸位置
      setLastScroll(currentScroll);

      // console.log("currentScroll", currentScroll);
      // console.log("lastScroll", lastScroll);
      // console.log(headerHeight);
      // console.log(headerStyle);
    });
  }, [currentScroll]);

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
    {
      to: "/collection",
      icon: (
        <CollectionIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "收藏",
    },
    {
      to: "/login",
      icon: (
        <LoginIcon className="w-5 h-5 fill-primary transition-all duration-200 group-hover:fill-white " />
      ),
      text: "登入|註冊",
    },
  ];

  return (
    <div
      className="bg-white bg-opacity-80 backdrop-blur-sm fixed top-0 z-20 transition-all duration-300 w-full"
      style={headerStyle}
    >
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
    return (
      <li className="group transition-all duration-500 ease-in-out hover:bg-secondary">
        <Link
          to={to}
          className="flex gap-2 text-primary transition duration-200 group-hover:text-white py-6 px-4"
        >
          {children}
        </Link>
      </li>
    );
  }
};

export default Header;
