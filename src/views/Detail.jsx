import React, { useEffect, useState } from "react";
import { useTravelContext } from "../context";
import Map from "../components/Map";

const Detail = () => {
  const { targetItem, targetClass, setTargetIndex } = useTravelContext();
  const [picList, setPicList] = useState([]);
  useEffect(() => {
    console.log(targetClass);
    console.log(targetItem);
    setTargetIndex("notIndex");
    let picArr = [];
    picArr = Object.entries(targetItem.Picture).map(
      ([description, val], index) => {
        if (index % 2 === 0) {
          return { description, url: val };
        }
      }
    );
    setPicList(picArr);
  }, [targetItem]);
  return (
    <section className="container min-h-screen pt-20 pb-8">
      <div className="flex justify-center items-center">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <img
                className="w-full h-auto max-h-96 object-[50%_25%] object-cover rounded"
                src={targetItem.Picture.PictureUrl1}
                alt={targetItem.Picture.PictureDescription1}
              />
              <div className="flex flex-col justify-center items-center">
                {picList.map((item, index) => {
                  item !== undefined && (
                    <img
                      className="w-full h-auto max-h-32 object-center object-cover rounded"
                      src={item.url}
                      alt={item.description}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <h1 className="text-3xl">
              {targetClass === "推薦景點"
                ? targetItem.ScenicSpotName
                : targetClass === "推薦餐廳"
                ? targetItem.RestaurantName
                : targetClass === "推薦住宿"
                ? targetItem.HotelName
                : targetClass === "推薦活動"
                ? targetItem.ActivityName
                : null}
            </h1>
            <hr />
          </div>
          <div className="flex justify-between gap-4">
            <ul className="p-4 rounded bg-gray-light divide-y divide-secondary-300 flex-auto">
              <li className="py-2">
                <p className="text-gray-dark">
                  {targetClass === "推薦景點"
                    ? targetItem.DescriptionDetail
                    : targetItem.Description}
                </p>
              </li>
              {targetItem.Address && (
                <li className="py-2">
                  <span className="text-gray-dark">地址：</span>
                  <span className="text-gray-dark">{targetItem.Address}</span>
                </li>
              )}
              {targetItem.Class && (
                <li className="py-2">
                  <span className="text-gray-dark">旅店級別：</span>
                  <span className="text-gray-dark">{targetItem.Class}</span>
                </li>
              )}
              <li className="py-2">
                <span className="text-gray-dark">電話：</span>
                <span className="text-gray-dark">{targetItem.Phone}</span>
              </li>
              {targetItem.OpenTime && (
                <li className="py-2">
                  <span className="text-gray-dark">營業時間：</span>
                  <span className="text-gray-dark">{targetItem.OpenTime}</span>
                </li>
              )}
            </ul>
            <div className="flex-auto">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
