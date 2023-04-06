import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useTravelContext} from '../context';
import {SearchIcon} from '../components/Icon';
import SearchContentList from '../components/SearchContentList';
import ReactPaginate from 'react-paginate';

const searchKeyword = document.querySelector('#Keyword');

function PageComponent({title}) {
  const {cityList, searchResult, setSearchTarget} = useTravelContext();
  const [searchResultList, setSearchResultList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(12);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get('City');
    let keyword = formData.get('Keyword');
    keyword = String(keyword).trim();
    const data = {
      city,
      title,
      keyword,
    };
    setSearchTarget(data);
    searchKeyword.value = '';
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      const searchResultPerPage = 12;
      const pageVisited = pageNumber * searchResultPerPage;
      setSearchResultList(searchResult.slice(pageVisited, pageVisited + searchResultPerPage));
      setPageCount(Math.ceil(searchResult.length / searchResultPerPage));
    }
  }, [ searchResult, pageNumber ]);
  
  return (
    <section className="container pt-8 pb-4 mx-auto sm:pt-12 md:pt-16 md:pb-10 lg:pb-16 xl:pb-24">
      <nav className="flex gap-2 mb-2 text-sm md:text-base text-gray-dark md:mb-4">
        <Link className="text-primary" to="/">
          首頁
        </Link>
        <span>/</span>
        <span>探索{title}</span>
      </nav>
      <form
        name="formSet"
        className="flex flex-wrap mb-8 space-y-4 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24"
        onSubmit={onSubmit}
      >
        <div className="w-full space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 md:space-x-8">
          <label
            className="block mb-1 text-sm font-medium text-gray-dark sm:text-base md:text-lg sm:mb-0"
            htmlFor="City"
          >
            請選擇城市
          </label>
          <select
            id="City"
            name="City"
            className="w-full p-3 mb-2 border border-gray-100 rounded sm:w-auto bg-gray-light text-primary-light sm:p-4 sm:mb-0"
          >
            <option value="all">全部縣市</option>
            {cityList.map((city) => (
              <option key={city.zh_Tw} value={city.zh_Tw}>
                {city.zh_Tw}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 md:space-x-8">
          <label
            className="block mb-1 text-sm font-medium text-gray-dark sm:text-base md:text-lg sm:mb-0"
            htmlFor="Keyword"
          >
            請輸入關鍵字
          </label>
          <input
            id="Keyword"
            name="Keyword"
            type="text"
            className="w-full p-4 mb-2 placeholder-opacity-0 border rounded bg-gray-light placeholder-primary-light"
            placeholder="請輸入關鍵字"
          />
        </div>
        <button
        type="submit"
        className="absolute top-0 right-0 h-full px-6 py-3 text-white transition-all ease-in-out rounded bg-primary duration-800 hover:bg-secondary hover:bg-opacity-75"
      >
        <SearchIcon className="w-6 h-6" />
          <div className="flex items-center justify-center w-full">
            <SearchIcon className="w-6 h-6 mr-4" />
            <span>
              <span className="pr-5">搜</span>尋
            </span>
          </div>
        </button>
      </form>
      <div className="space-y-9">
        {searchResult.length > 0 &&
          (searchResultList.length > 0 ? (
            <>
              <SearchContentList data={searchResultList} header="搜尋結果" title={title} />
              <ReactPaginate
                previousLabel={'上一頁'}
                nextLabel={'下一頁'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={(e) => setPageNumber(e.selected)}
                containerClassName="flex justify-center items-center gap-2"
                activeLinkClassName="bg-secondary text-white"
                previousLinkClassName="text-secondary py-2 px-4 border border-secondary rounded transition-all duration-300 ease-in-out hover:bg-secondary hover:bg-opacity-75 hover:text-white"
                nextLinkClassName="text-secondary py-2 px-4 border border-secondary rounded transition-all duration-300 ease-in-out hover:bg-secondary hover:bg-opacity-75 hover:text-white"
                disabledLinkClassName="bg-gray-light cursor-not-allowed opacity-50"
                pageClassName="text-secondary"
                pageLinkClassName="py-2 px-4 border border-secondary rounded transition-all duration-300 ease-in-out hover:bg-secondary hover:bg-opacity-75 hover:text-white"
              />
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl text-gray-dark">查無結果</h1>
            </div>
          ))}
      </div>
    </section>
  );
}

export default PageComponent;
