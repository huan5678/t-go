import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelContext } from "../context";
import Map from "../components/Map";
import parse from "html-react-parser";

const Detail = () => {
  const { targetItem, targetClass, targetPicList } = useTravelContext();
  let navigation = useNavigate();

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
    if (!targetItem) {
      setTimeout(() => {
        navigation("/");
      }, 3000);
    }
  }, [targetPicList]);

  return (
    <section className="container min-h-screen pt-20 pb-8">
      <div className="flex justify-center items-center">
        <div className="space-y-4">
          <div className="space-y-4">
            {lightBox()}
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
          <p className="text-gray-dark">
            {targetClass === "推薦景點"
              ? targetItem.DescriptionDetail
              : targetItem.Description}
          </p>
          <div className="flex justify-between gap-4">
            <ul className="p-4 rounded bg-gray-light divide-y divide-secondary-300 flex-auto">
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
                  <span className="text-gray-dark">營業|開放時間：</span>
                  <span className="text-gray-dark">{targetItem.OpenTime}</span>
                </li>
              )}
              {targetItem.ParkingInfo && (
                <li className="py-2">
                  <span className="text-gray-dark">停車資訊：</span>
                  <span className="text-gray-dark">
                    {targetItem.ParkingInfo}
                  </span>
                </li>
              )}
              {targetItem.WebsiteUrl && (
                <li className="py-2">
                  <a href={targetItem.WebsiteUrl} className="text-gray-dark">
                    <span className="text-gray-dark flex items-center gap-2">
                      活動網站
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </span>
                  </a>
                </li>
              )}
              {targetItem.TicketInfo && (
                <li className="py-2">
                  <span className="text-gray-dark">票價資訊：</span>
                  <span className="text-gray-dark">
                    {targetItem.TicketInfo}
                  </span>
                </li>
              )}
              {targetItem.TravelInfo && (
                <li className="py-2 text-gray-dark">
                  旅遊資訊：
                  {parse(targetItem.TravelInfo)}
                </li>
              )}
            </ul>
            <div className="flex-auto bg-gray-light rounded-xl overflow-hidden flex justify-center items-center">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function lightBox() {
    return (
      <div className="flex justify-between rounded-xl bg-gray-dark overflow-hidden max-h-96">
        <img
          className="flex-auto min-w-[60vw] h-auto object-[50%_25%] object-cover rounded"
          src={selectPic.url}
          alt={selectPic.description}
        />
        {targetPicList.length > 1 && (
          <ul className="flex-auto flex flex-col justify-around items-center w-3/12">
            {targetPicList.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex-auto justify-center items-center cursor-pointer h-1/3"
                >
                  <img
                    className="object-cover"
                    src={item.url}
                    alt={item.description}
                    onClick={() => handlePicSelected(item)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
};

export default Detail;
