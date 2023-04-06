import React from 'react';
import {Link} from 'react-router-dom';
import {useTravelContext} from '../context';

import Card from './Card';

const ContentList = (props) => {
  const {setTargetItem, setTargetClass} = useTravelContext();

  const handleClick = (item, type) => {
    setTargetItem(item);
    setTargetClass(type);
  };

  return (
    <section className="container mx-auto">
      <h2 className="mb-8 text-2xl text-center text-gray">{props.title}</h2>
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        {props.data.map((item, index) => {
          return (
            <li
              className="w-full px-2 py-2 md:w-1/2 lg:w-1/4"
              key={index}
              onClick={() => handleClick(item, props.title)}
            >
              <Link to={`/detail`}>
                <Card
                  key={
                    props.title === '推薦景點'
                      ? item.ScenicSpotID
                      : props.title === '推薦餐廳'
                      ? item.RestaurantID
                      : props.title === '推薦住宿'
                      ? item.HotelID
                      : props.title === '推薦活動'
                      ? item.ActivityID
                      : null
                  }
                  image={item.Picture.PictureUrl1}
                  title={
                    props.title === '推薦景點'
                      ? item.ScenicSpotName
                      : props.title === '推薦餐廳'
                      ? item.RestaurantName
                      : props.title === '推薦住宿'
                      ? item.HotelName
                      : props.title === '推薦活動'
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

export default ContentList;
