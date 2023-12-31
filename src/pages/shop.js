  import React, { useState } from "react";
  import { Link, useRouteLoaderData } from "react-router-dom";
  import Breadcrumb from "../components/breadcrumb/Breadcrumb";
  import ShopCard from "../components/shop/ShopCard";
  import Layout from "../layout/Layout";
  import { useEffect } from "react";
  import axios from "axios";
  import { useSelector, useDispatch } from "react-redux";
  import { searchStart, updateQuery, updateReload } from "../redux/searchSlice";
  function Shop() {
    const [sizePage, setSizePage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    // const [category, setCategory] = useState([]);
    const [isShopAll, setIsShopAll] = useState(false);
    const [products, setProducts] = useState([]);
    const query = useSelector((state) => state.search.query);
    const reload = useSelector((state) => state.search.reload);
    const dispatch = useDispatch();
    // const [checkedCategory, setCheckedCategory] = useState([]);
      const isSearching = useSelector((state) => state.search.isSearching);
    const isLogin = useSelector((state) => state.auth.login?.currentUser);
    let token = "";
    if (isLogin) {
      token = isLogin.token;
    }
    if(reload){
      dispatch(updateQuery(""));
      dispatch(updateReload(false));
    }
    const handleShopAll = () => {
      setIsShopAll(true); 
      dispatch(updateQuery(""));
      dispatch(searchStart(false));
    }
  const SEARCHING_API = process.env.REACT_APP_FETCH_API + `/products/search?query=${query}`;
    
    // useEffect(() => {
    //   axios
    //     .get(`${SEARCHING_API}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       setProducts(res.data.content);
    //       setTotalPages(res.data.totalPages);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }, [isShopAll, query, isSearching]);
    useEffect(() => {
      // Separate useEffect for fetching data
      const fetchData = async () => {
        try {
          const res = await axios.get(`${SEARCHING_API}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }, [SEARCHING_API, token]);

    //Cập nhật lại size
    function handleSizeChange(event) {
      setSizePage(event.target.value);
      setCurrentPage(0);
    }


    //Cập nhật lại số trang hiện tại
    function changePageNumber(page) {
      setCurrentPage(page);
      window.scroll(0, 0);
    }

    //Phân trang
    function contentPageNumber() {
      let content = [];
      for (let i = 0; i < totalPages; i++) {
        content.push(
          <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
            <Link className="page-link" onClick={() => changePageNumber(i)}>
              {i + 1}
            </Link>
          </li>
        );
      }
      return content;
    }
    return (
      <>
        <Layout>
          <Breadcrumb pageName="Shop" pageTitle="Shop" />
          <div className="shop-page pt-120 mb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                <div className="shop-sidebar">
                    <div className="shop-widget">
                      <div className="item">
                        <h5 className="shop-widget-title">Brands included</h5>
                        <ul className="container">
                          <li>Korea </li>
                          <li>VietNam </li>
                          <li>Japan</li>
                          <li>America</li>
                          <li>ChiNa</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row mb-50">
                    <div className="col-lg-12">
                      <div className="multiselect-bar">
                        <h6 className="shop-all" onClick={handleShopAll}>Shop all products</h6>
                        <div className="multiselect-area">
                          <div className="single-select">
                            <span>Show</span>
                            <select
                              className="defult-select-drowpown"
                              id="color-dropdown"
                              onChange={handleSizeChange}
                            >
                              <option name="9" value={"9"}>
                                9
                              </option>
                              <option name="12" value={"12"}>
                                12
                              </option>
                              <option name="15" value={"15"}>
                                15
                              </option>
                              <option name="18" value={"18"}>
                                18
                              </option>
                              <option name="21" value={"21"}>
                                21
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-4 justify-content-center">
                    <ShopCard
                      sizePages={sizePage}
                      currentPage={currentPage}
                      setTotalPages={setTotalPages}
                      products={products}
                    />
                  </div>
                  <div className="row pt-70">
                    <div className="col-lg-12 d-flex justify-content-center">
                      <div className="paginations-area">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 0 ? "disabled" : ""
                              }`}
                            >
                              <Link
                                className="page-link"
                                onClick={() => changePageNumber(currentPage - 1)}
                              >
                                <i className="bi bi-arrow-left-short" />
                              </Link>
                            </li>

                            {contentPageNumber()}

                            <li
                              className={`page-item ${
                                currentPage === totalPages - 1 ? "disabled" : ""
                              }`}
                            >
                              <Link
                                className="page-link"
                                onClick={() => changePageNumber(currentPage + 1)}
                              >
                                <i className="bi bi-arrow-right-short" />
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  export default Shop;
