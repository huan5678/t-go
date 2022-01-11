import React from "react";
import { Link } from "react-router-dom";
import { useTravelContext } from "../context";

import Card from "./Card";

const ContentList = (props) => {
  const { setTargetItem } = useTravelContext();

  const handleClick = (item) => {
    setTargetItem(item);
  };

  return (
    <section className="container">
      <h2 className="text-center text-gray text-2xl mb-8">{props.title}</h2>
      <ul className="flex justify-between flex-wrap gap-8">
        {props.data.map((item, index) => {
          return (
            <li
              className="flex-[1_1_25%] -mx-4 -my-4 px-4 py-4"
              key={index}
              onClick={handleClick(item)}
            >
              <Link to={`/detail/${item.ScenicSpotID}`}>
                <Card
                  key={
                    props.title === "推薦景點"
                      ? item.ScenicSpotID
                      : props.title === "推薦餐廳"
                      ? item.RestaurantID
                      : props.title === "推薦住宿"
                      ? item.HotelID
                      : props.title === "推薦活動"
                      ? item.ActivityID
                      : null
                  }
                  image={item.Picture.PictureUrl1}
                  title={
                    props.title === "推薦景點"
                      ? item.ScenicSpotName
                      : props.title === "推薦餐廳"
                      ? item.RestaurantName
                      : props.title === "推薦住宿"
                      ? item.HotelName
                      : props.title === "推薦活動"
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
