import React, { useEffect, useState } from "react";
import { useTravelContext } from "../context";
import Map from "../components/Map";

const Detail = () => {
  const { targetItem, targetClass } = useTravelContext();
  const [picList, setPicList] = useState([]);
  const [selectPic, setSelectPic] = useState({
    url: targetItem.Picture.PictureUrl1,
    description: targetItem.Picture.Description1,
  });

  const handlePicSelected = (item) => {
    setSelectPic({
      url: item.url,
      description: item.description,
    });
  };

  useEffect(() => {
    console.log(targetClass);
    console.log(targetItem);
    let picArr = [];
    picArr = Object.entries(targetItem.Picture).map(
      ([description, url], index) => {
        if (index % 2 === 0) {
          return { description, url };
        }
      }
    );
    picArr = picArr.filter((item) => item !== undefined);
    setPicList(picArr);
    console.log(picList);
  }, []);

  return (
    <section className="container min-h-screen pt-20 pb-8">
      <div className="flex justify-center items-center">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <img
                className="flex-1 w-full h-auto max-h-96 object-[50%_25%] object-cover rounded"
                src={selectPic.url}
                alt={selectPic.description}
              />
              <ul className="flex-1 flex flex-col justify-center items-center gap-4">
                {picList.map((item, index) => {
                  <li
                    key={index}
                    onClick={() => handlePicSelected(item)}
                    className="bg-gray-light"
                  >
                    pic
                    <img
                      className="w-full h-auto max-h-32 object-center object-cover rounded"
                      src={item.url}
                      alt={item.description}
                    />
                  </li>;
                })}
              </ul>
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
            <div className="flex-auto bg-gray-light rounded">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
