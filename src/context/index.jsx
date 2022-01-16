import { useState, useEffect, useContext, createContext } from "react";
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
  const [targetPicList, setTargetPicList] = useState([]);
  const [searchTarget, setSearchTarget] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchData("ScenicSpot")
      .then((res) => {
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

  useEffect(() => {
    if (targetItem !== null) {
      let picArr = [];
      let urlTest =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      picArr = Object.entries(targetItem.Picture).map(
        ([description, url], index) => {
          if (urlTest.test(url)) return { description, url };
        }
      );
      picArr = picArr.filter((item) => item !== undefined);
      setTargetPicList(picArr);
    }
  }, [targetItem]);

  const [cityList] = useState([
    {
      zh_Tw: "南投縣",
      en_Us: "NantouCounty",
    },
    {
      zh_Tw: "屏東縣",
      en_Us: "PingtungCounty",
    },
    {
      zh_Tw: "嘉義縣",
      en_Us: "ChiayiCounty",
    },
    {
      zh_Tw: "苗栗縣",
      en_Us: "MiaoliCounty",
    },
    {
      zh_Tw: "雲林縣",
      en_Us: "YunlinCounty",
    },
    {
      zh_Tw: "桃園市",
      en_Us: "Taoyuan",
    },
    { zh_Tw: "臺東縣", en_Us: "TaitungCounty" },
    { zh_Tw: "臺北市", en_Us: "Taipei" },
    { zh_Tw: "澎湖縣", en_Us: "PenghuCounty" },
    { zh_Tw: "宜蘭縣", en_Us: "YilanCounty" },
    { zh_Tw: "嘉義市", en_Us: "Chiayi" },
    { zh_Tw: "新竹市", en_Us: "Hsinchu" },
    { zh_Tw: "連江縣", en_Us: "LienchiangCounty" },
    { zh_Tw: "彰化縣", en_Us: "ChanghuaCounty" },
    { zh_Tw: "新北市", en_Us: "NewTaipei" },
    { zh_Tw: "花蓮縣", en_Us: "HualienCounty" },
    { zh_Tw: "新竹縣", en_Us: "HsinchuCounty" },
    { zh_Tw: "高雄市", en_Us: "Kaohsiung" },
    { zh_Tw: "基隆市", en_Us: "Keelung" },
    { zh_Tw: "臺南市", en_Us: "Tainan" },
    { zh_Tw: "金門縣", en_Us: "KinmenCounty" },
    { zh_Tw: "臺中市", en_Us: "Taichung" },
  ]);

  useEffect(() => {
    if (searchTarget !== null) {
      let title = searchTarget.title;
      let city = searchTarget.city;
      let keyword = searchTarget.keyword;
      let result = [];
      switch (title) {
        case "景點": {
          scenicSpotData.filter((item) => {
            city === "all"
              ? item.ScenicSpotName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                result.push(item)
              : item.ScenicSpotName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                item.City === city &&
                result.push(item);
          });
          break;
        }
        case "餐飲": {
          restaurantData.filter((item) => {
            city === "all"
              ? item.RestaurantName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                result.push(item)
              : item.RestaurantName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                item.City === city &&
                result.push(item);
          });
          break;
        }
        case "旅宿": {
          hotelData.filter((item) => {
            city === "all"
              ? item.HotelName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                result.push(item)
              : item.HotelName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                item.City === city &&
                result.push(item);
          });
          break;
        }
        case "活動": {
          activityData.filter((item) => {
            city === "all"
              ? item.ActivityName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                result.push(item)
              : item.ActivityName.match(keyword) &&
                item.Picture.PictureUrl1 !== undefined &&
                item.City === city &&
                result.push(item);
          });
          break;
        }
      }
      setSearchResult(result);
    }
  }, [searchTarget]);

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
        targetPicList,
        cityList,
        searchTarget,
        setSearchTarget,
        searchResult,
      }}
    >
      {children}
    </travelContext.Provider>
  );
};

export const useTravelContext = () => useContext(travelContext);
