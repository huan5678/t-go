import {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import fetchData from "../api";
import { createApi } from "unsplash-js";

const travelContext = createContext();

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const getRandomArray = (arr, num) => {
  let result = [];
  let index = 0;
  while (index < num) {
    let random = Math.floor(Math.random() * arr.length);
    if (result.indexOf(arr[random]) === -1) {
      result.push(arr[random]);
      index++;
    }
  }
  return result;
};

export const TravelContextProvider = ({ children }) => {
  const [scenicSpotData, setScenicSpotData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [bannerImg, setBannerImg] = useState([]);
  const [scenicSpotRandom, setScenicSpotRandom] = useState([]);
  const [restaurantRandom, setRestaurantRandom] = useState([]);
  const [hotelRandom, setHotelRandom] = useState([]);
  const [activityRandom, setActivityRandom] = useState([]);
  const [targetItem, setTargetItem] = useState(null);
  const [targetClass, setTargetClass] = useState(null);
  const [targetIndex, setTargetIndex] = useState("Index");

  useEffect(() => {
    fetchData("ScenicSpot")
      .then((res) => {
        console.log(res.data);
        let scenicSpot = [];
        scenicSpot = res.data.filter(
          (item) => item.Picture.PictureUrl1 !== undefined
        );
        setScenicSpotData(scenicSpot);
        let scenicRandom = getRandomArray(scenicSpot, 12);
        setScenicSpotRandom(scenicRandom);
      })
      .catch((err) => console.error(err));
    fetchData("Restaurant")
      .then((res) => {
        console.log(res.data);
        let restaurant = [];
        restaurant = res.data.filter(
          (item) => item.Picture.PictureUrl1 !== undefined
        );
        setRestaurantData(restaurant);
        let restaurantRandom = getRandomArray(restaurant, 12);
        setRestaurantRandom(restaurantRandom);
      })
      .catch((err) => console.error(err));
    fetchData("Hotel")
      .then((res) => {
        console.log(res.data);
        let hotel = [];
        hotel = res.data.filter(
          (item) => item.Picture.PictureUrl1 !== undefined
        );
        setHotelData(hotel);
        let hotelRandom = getRandomArray(hotel, 12);
        setHotelRandom(hotelRandom);
      })
      .catch((err) => console.error(err));
    fetchData("Activity")
      .then((res) => {
        console.log(res.data);
        let activity = [];
        activity = res.data.filter(
          (item) => item.Picture.PictureUrl1 !== undefined
        );
        setActivityData(activity);
        let activityRandom = getRandomArray(activity, 12);
        setActivityRandom(activityRandom);
      })
      .catch((err) => console.error(err));

    unsplash.photos
      .getRandom({ count: "10", query: "taiwan", orientation: "landscape" })
      .then((res) => {
        setBannerImg(res.response);
      })
      .catch(() => {
        console.log("在我們中出了個錯誤!");
      });
  }, []);

  return (
    <travelContext.Provider
      value={{
        scenicSpotData,
        scenicSpotRandom,
        restaurantData,
        restaurantRandom,
        hotelData,
        hotelRandom,
        activityData,
        activityRandom,
        bannerImg,
        targetItem,
        setTargetItem,
        targetClass,
        setTargetClass,
        targetIndex,
        setTargetIndex,
      }}
    >
      {children}
    </travelContext.Provider>
  );
};

export const useTravelContext = () => useContext(travelContext);
