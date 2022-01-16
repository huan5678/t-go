// import { useTravelContext } from "./context";
import { Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageComponent from "./views/PageComponent";
import Detail from "./views/Detail";

function App() {
  // const { scenicSpotData, restaurantData, hotelData, activityData, bannerImg } =
  //   useTravelContext();

  // console.log("景點", scenicSpotData);
  // console.log("餐廳", restaurantData);
  // console.log("住宿", hotelData);
  // console.log("活動", activityData);
  // console.log("banner", bannerImg);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/scenic" element={<PageComponent title="景點" />} />
        <Route path="/restaurant" element={<PageComponent title="餐飲" />} />
        <Route path="/hotel" element={<PageComponent title="旅宿" />} />
        <Route path="/activity" element={<PageComponent title="活動" />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
