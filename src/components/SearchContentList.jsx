import React from 'react';
import {Link} from 'react-router-dom';
import {useTravelContext} from '../context';

import Card from './Card';

const SearchContentList = (props) => {
  const {setTargetItem, setTargetClass} = useTravelContext();

  const handleClick = (item, type) => {
    setTargetItem(item);
    setTargetClass(type);
  };

  return (
    <section className="container">
      <h2 className="mb-8 text-2xl text-center text-gray">{props.header}</h2>
      <ul className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
        {props.data.map((item, index) => {
          return (
            <li
              className="w-full px-2 py-2 md:w-1/2 lg:w-1/4 md:px-4 md:py-4"
              key={index}
              onClick={() => handleClick(item, props.title)}
            >
              <Link
                to={`/detail/${
                  props.title === '景點'
                    ? item.ScenicSpotID
                    : props.title === '餐飲'
                    ? item.RestaurantID
                    : props.title === '旅宿'
                    ? item.HotelID
                    : props.title === '活動'
                    ? item.ActivityID
                    : null
                }`}
              >
                <Card
                  key={
                    props.title === '景點'
                      ? item.ScenicSpotID
                      : props.title === '餐飲'
                      ? item.RestaurantID
                      : props.title === '旅宿'
                      ? item.HotelID
                      : props.title === '活動'
                      ? item.ActivityID
                      : null
                  }
                  image={item.Picture.PictureUrl1}
                  title={
                    props.title === '景點'
                      ? item.ScenicSpotName
                      : props.title === '餐飲'
                      ? item.RestaurantName
                      : props.title === '旅宿'
                      ? item.HotelName
                      : props.title === '活動'
                      ? item.ActivityName
                      : null
                  }
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SearchContentList;
