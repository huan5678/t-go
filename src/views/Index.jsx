import React from 'react';
import {useTravelContext} from '../context';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/effect-fade';
import SwiperCore, {Autoplay, EffectFade, Lazy} from 'swiper';
import ContentList from '../components/ContentList';

SwiperCore.use([Autoplay, Lazy, EffectFade]);

function Index() {
  const {scenicSpotRandom, restaurantRandom, hotelRandom, activityRandom, bannerImg} =
    useTravelContext();

  return (
    <main>
      <section className="pb-6">
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect={'fade'}
            loop={true}
            lazy={true}
          >
            {bannerImg.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img className="object-cover w-full h-screen" src={item.urls.raw} alt="banner" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="container absolute z-10 flex flex-col items-center justify-center w-full px-4 -translate-x-1/2 bg-gray-100 bg-opacity-75 md:px-0 lg:px-12 backdrop-blur md:top-1/4 lg:left-1/4 lg:w-1/2 h-96 rounded-xl md:flex-row">
            <div className="mb-8 md:mb-0">
              <h1 className="mb-4 text-2xl font-normal leading-normal text-center md:text-4xl lg:text-5xl text-gray-dark md:text-left md:mb-5">
                探索
                <span className="border-b-2 border-warning text-gay-dark">台灣上水</span>
                <span className="block text-lg md:text-2xl lg:text-3xl md:pt-6">
                  讓我們發現比人更美的風景
                </span>
              </h1>
              <p className="flex items-center justify-center text-gray md:justify-start">
                <span className="inline-block text-xs md:text-base">台灣旅遊導覽</span>
                <span className="inline-block pl-1 font-serif font-bold text-xxs md:text-lg">
                  Taiwan Travel Guide
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-20 space-y-9">
        <ContentList title={'推薦景點'} data={scenicSpotRandom} />
        <ContentList title={'推薦餐廳'} data={restaurantRandom} />
        <ContentList title={'推薦住宿'} data={hotelRandom} />
        <ContentList title={'推薦活動'} data={activityRandom} />
      </section>
    </main>
  );
}

export default Index;
