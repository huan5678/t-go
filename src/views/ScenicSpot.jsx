import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

function ScenicSpot() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get("City");
    const date = formData.get("Date");
    const theme = formData.get("Theme");
    let keyword = formData.get("Keyword");
    keyword = String(keyword).trim();
    const data = {
      city,
      date,
      theme,
      keyword,
    };
    console.log(data);
  };

  const cities = useContext(CityListContext).data;

  return (
    <section className="container pt-6 pb-15">
      <nav className="mb-4">
        <Link className="text-primary" to="/">
          首頁
        </Link>
        <span>/</span>
        <Link className="text-gray" to="/scenic">
          探索景點
        </Link>
      </nav>
      <form
        name="formSet"
        className="flex flex-wrap space-y-2"
        onSubmit={onSubmit}
      >
        <div className="w-full">
          <select
            name="City"
            className="w-full border border-gray-100 rounded text-primary-light py-3 pl-7 mb-2"
          >
            <option value="">請選擇城市</option>
            <option value="all">全部縣市</option>
            {cities.map((city) => (
              <option key={city.CityId} value={city.CityId}>
                {city.CityName}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full relative">
          <input
            id="Date"
            type="date"
            className="w-full bg-gray-light border border-gray-100 rounded text-primary-light py-3 pl-7 mb-2"
          />
          <label htmlFor="Date" className="text-primary-light">
            選擇日期
          </label>
        </div>
        <div className="w-full">
          <select
            name="Theme"
            className="w-full border border-gray-100 rounded placeholder-primary-light py-3 pl-7 mb-2"
          >
            <option value="all">全部主題</option>
          </select>
          <label htmlFor="Theme" className="text-primary-light">
            選擇主題
          </label>
        </div>
        <div className="relative w-full">
          <input
            id="Keyword"
            name="Keyword"
            type="text"
            className="w-full bg-gray-light border border-gray-100 rounded placeholder-opacity-0 placeholder-primary-light py-3 pl-7 mb-2"
            placeholder="想找有趣的？請輸入關鍵字"
          />
          <label
            className="absolute top-0 left-0 pl-4 translate-y-1/2 text-primary-light"
            htmlFor="Keyword"
          >
            想找有趣的？請輸入關鍵字
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-light text-white py-3 pl-7 rounded"
        >
          <div className="flex justify-center items-center w-full">
            <img className="inline pr-4" src={iconSearch} alt="搜尋" />
            <span>
              <span className="pr-5">搜</span>尋
            </span>
          </div>
        </button>
      </form>
      <h1 className="font-light text-gray-dark text-2xl">熱門主題</h1>
    </section>
  );
}

export default ScenicSpot;
