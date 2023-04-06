import {useState, useEffect, useContext, createContext, useMemo} from 'react';
import fetchData from '../api';
import {createApi} from 'unsplash-js';

const travelContext = createContext();

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const cityList = useMemo(
  () => [
    {
      zh_Tw: '南投縣',
      en_Us: 'NantouCounty',
    },
    {
      zh_Tw: '屏東縣',
      en_Us: 'PingtungCounty',
    },
    {
      zh_Tw: '嘉義縣',
      en_Us: 'ChiayiCounty',
    },
    {
      zh_Tw: '苗栗縣',
      en_Us: 'MiaoliCounty',
    },
    {
      zh_Tw: '雲林縣',
      en_Us: 'YunlinCounty',
    },
    {
      zh_Tw: '桃園市',
      en_Us: 'Taoyuan',
    },
    {zh_Tw: '臺東縣', en_Us: 'TaitungCounty'},
    {zh_Tw: '臺北市', en_Us: 'Taipei'},
    {zh_Tw: '澎湖縣', en_Us: 'PenghuCounty'},
    {zh_Tw: '宜蘭縣', en_Us: 'YilanCounty'},
    {zh_Tw: '嘉義市', en_Us: 'Chiayi'},
    {zh_Tw: '新竹市', en_Us: 'Hsinchu'},
    {zh_Tw: '連江縣', en_Us: 'LienchiangCounty'},
    {zh_Tw: '彰化縣', en_Us: 'ChanghuaCounty'},
    {zh_Tw: '新北市', en_Us: 'NewTaipei'},
    {zh_Tw: '花蓮縣', en_Us: 'HualienCounty'},
    {zh_Tw: '新竹縣', en_Us: 'HsinchuCounty'},
    {zh_Tw: '高雄市', en_Us: 'Kaohsiung'},
    {zh_Tw: '基隆市', en_Us: 'Keelung'},
    {zh_Tw: '臺南市', en_Us: 'Tainan'},
    {zh_Tw: '金門縣', en_Us: 'KinmenCounty'},
    {zh_Tw: '臺中市', en_Us: 'Taichung'},
  ],
  []
);

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

  const getSearchResult = (searchTarget) => {
    const {title, city, keyword} = searchTarget;
    let result = [];

    switch (title) {
      case '景點': {
        result = filterData(scenicSpotData, city, keyword, 'ScenicSpotName');
        break;
      }
      case '餐飲': {
        result = filterData(restaurantData, city, keyword, 'RestaurantName');
        break;
      }
      case '旅宿': {
        result = filterData(hotelData, city, keyword, 'HotelName');
        break;
      }
      case '活動': {
        result = filterData(activityData, city, keyword, 'ActivityName');
        break;
      }
      default:
        break;
    }

    return result;
  };

  const filterData = (data, city, keyword, type) => {
    return data.filter((item) => {
      return (
        item.Picture.PictureUrl1 !== undefined &&
        (city === 'all' || item.City === city) &&
        item[type].match(keyword)
      );
    });
  };

export const TravelContextProvider = ({children}) => {
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
    const fetchDataFunc = async () => {
      const [scenicSpotRes, restaurantRes, hotelRes, activityRes] = await Promise.all([
        fetchData('ScenicSpot'),
        fetchData('Restaurant'),
        fetchData('Hotel'),
        fetchData('Activity'),
      ]);
      const scenicSpot = scenicSpotRes.data.filter(
        (item) => item.Picture.PictureUrl1 !== undefined
      );
      setScenicSpotData(scenicSpot);
      setScenicSpotRandom(getRandomArray(scenicSpot, 12));

      const restaurant = restaurantRes.data.filter(
        (item) => item.Picture.PictureUrl1 !== undefined
      );
      setRestaurantData(restaurant);
      setRestaurantRandom(getRandomArray(restaurant, 12));

      const hotel = hotelRes.data.filter((item) => item.Picture.PictureUrl1 !== undefined);
      setHotelData(hotel);
      setHotelRandom(getRandomArray(hotel, 12));

      const activity = activityRes.data.filter((item) => item.Picture.PictureUrl1 !== undefined);
      setActivityData(activity);
      setActivityRandom(getRandomArray(activity, 12));
      try {
        const res = await unsplash.photos.getRandom({
          count: '10',
          query: 'taiwan',
          orientation: 'landscape',
        });
        setBannerImg(res.response);
      } catch (error) {
        console.log('在我們中出了個錯誤!');
      }
    };
    fetchDataFunc();
  }, []);

  useEffect(() => {
    if (targetItem === null) {
      return;
    }

    const {Picture, type} = targetItem;
    const picArr = Object.entries(Picture)
      .map(([description, url], index) => {
        const urlTest = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (urlTest.test(url)) {
          return {description, url};
        }
      })
      .filter((item) => item !== undefined);
    setTargetPicList(picArr);
  }, [targetItem]);

  useEffect(() => {
    if (searchTarget === null) {
      return;
    }

    const searchResult = getSearchResult(searchTarget);
    setSearchResult(searchResult);
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
