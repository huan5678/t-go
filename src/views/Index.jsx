import React, { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "../components/Icon";
import { useTravelContext } from "../context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/effect-fade";
import SwiperCore, { Autoplay, EffectFade, Lazy } from "swiper";
import ContentList from "../components/ContentList";

SwiperCore.use([Autoplay, Lazy, EffectFade]);

function Index() {
  const {
    scenicSpotRandom,
    restaurantRandom,
    hotelRandom,
    activityRandom,
    bannerImg,
    setTargetIndex,
  } = useTravelContext();

  const handleSetTarget = () => setTargetIndex("Index");

  useMemo(() => {
    handleSetTarget();
  }, []);

  return (
    <main>
      <section className="pb-6">
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={"fade"}
            loop={true}
            lazy={true}
          >
            {bannerImg.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    className="h-screen w-full object-cover"
                    src={item.urls.raw}
                    alt="banner"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="absolute bg-gray-100 bg-opacity-75 backdrop-blur top-1/4 left-1/2 -translate-x-1/2 w-full h-96 z-10 px-12 rounded-xl container flex flex-col md:flex-row justify-center items-center">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="text-3xl md:text-5xl leading-normal font-normal text-gray-dark text-center md:text-left mb-4 md:mb-5">
                探索
                <span className="border-warning text-gay-dark border-b-2">
                  台灣上水
                </span>
                <span className="block md:pt-6 text-2xl">
                  讓我們發現比人更美的風景
                </span>
              </h1>
              <p className="text-gray flex justify-center md:justify-start items-center">
                <span className="text-sm inline-block md:text-xl">
                  台灣旅遊導覽
                </span>
                <span className="pl-1 inline-block text-xs md:text-lg font-serif font-bold">
                  Taiwan Travel Guide
                </span>
              </p>
            </div>
            <form className="w-full md:w-1/2">
              <select
                name="itemSelect"
                className="w-full border border-gray-100 rounded text-primary-light py-3 pl-7 mb-2"
              >
                <option value="">探索景點</option>
                <option value="">節慶活動</option>
                <option value="">品嚐美食</option>
              </select>
              <label htmlFor="searchInput"></label>
              <input
                id="searchInput"
                placeholder="你想去哪裡？請輸入關鍵字"
                className="w-full bg-gray-light border border-gray-100 rounded placeholder-gray-300 py-3 pl-7 mb-2"
              />
              <button
                type="button"
                className="w-full bg-primary rounded text-white py-3 pl-7 mb-2 transition-all duration-800 ease-in-out hover:bg-secondary hover:bg-opacity-75"
              >
                <div className="flex justify-center items-center w-full">
                  <SearchIcon className="h-6 w-6 mr-2" />
                  <span>
                    <span className="pr-5">搜</span>尋
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="space-y-9 mb-20">
        <ContentList title={"推薦景點"} data={scenicSpotRandom} />
        <ContentList title={"推薦餐廳"} data={restaurantRandom} />
        <ContentList title={"推薦住宿"} data={hotelRandom} />
        <ContentList title={"推薦活動"} data={activityRandom} />
      </section>
    </main>
  );
}

export default Index;
