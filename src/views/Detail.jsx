import React, { useEffect } from "react";
import { useTravelContext } from "../context";
import Map from "../components/Map";

const Detail = () => {
  const { targetItem, targetClass } = useTravelContext();
  useEffect(() => {
    console.log(targetClass);
    console.log(targetItem);
  }, [targetItem]);
  return (
    <section className="container min-h-screen pt-20 pb-8">
      <div className="flex justify-center items-center">
        <div className="space-y-4">
          <div className="space-y-4">
            <img
              className="w-full h-auto max-h-96 object-center object-cover rounded"
              src={targetItem.Picture.PictureUrl1}
              alt={targetItem.Picture.PictureDescription1}
            />
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
              <li className="py-2">
                <span className="text-gray-dark">電話：</span>
                <span className="text-gray-dark">{targetItem.Phone}</span>
              </li>
              <li className="py-2">
                <span className="text-gray-dark">營業時間：</span>
                <span className="text-gray-dark">{targetItem.OpenTime}</span>
              </li>
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
