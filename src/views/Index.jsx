import React from "react";
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
  } = useTravelContext();

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
            <div className="mb-8 md:mb-0">
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
