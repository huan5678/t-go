import axios from "axios";
import jsSHA from "jssha";

const AppID = import.meta.env.VITE_API_ID;
const AppKey = import.meta.env.VITE_API_KEY;

const requestOptions = () => {
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update(`x-date: ${GMTString}`);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return { Authorization: Authorization, "X-Date": GMTString };
};

const apiUrl = "https://ptx.transportdata.tw/MOTC/v2/";

let baseUrl = "";

const fetchData = async (props, City) => {
  City === undefined
    ? (baseUrl = `${apiUrl}Tourism/${props}?%24format=JSON`)
    : (baseUrl = `${apiUrl}Tourism/${props}/${City}/?%24format=JSON`);

  return await axios.get(baseUrl, {
    headers: requestOptions(),
  });
};

export default fetchData;
