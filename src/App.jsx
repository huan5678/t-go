import { useTravelContext } from "./context";
import { Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Activity from "./views/Activity";
import Restaurant from "./views/Restaurant";
import ScenicSpot from "./views/ScenicSpot";
import Hotel from "./views/Hotel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Detail from "./views/Detail";

function App() {
  const { scenicSpotData, restaurantData, hotelData, activityData, bannerImg } =
    useTravelContext();

  console.log("景點", scenicSpotData);
  console.log("餐廳", restaurantData);
  console.log("住宿", hotelData);
  console.log("活動", activityData);
  console.log("banner", bannerImg);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route path="/scenic" element={<ScenicSpot />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
