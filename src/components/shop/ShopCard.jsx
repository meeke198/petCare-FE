import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function discoutPrice(price, sale) {
  return price * (1 - sale / 100);
}

function ShopCard(props) {
  const [products, setProducts] = useState(props.products);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const query = useSelector((state) => state.search.query);
  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const isSearching = useSelector((state) => state.search.isSearching);
  let token = "";
  let userId = 0;
  if (isLogin) {
    token = isLogin.token;
    userId = isLogin.userDtoResponse.id;
  }
  const SEARCHING_API =
    process.env.REACT_APP_FETCH_API + `/products/search?query=${query}`;
  useEffect(() => {
    setIsLoading(true);
    // const delayedAction = () => {
      axios
        .get(`${SEARCHING_API}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.content);
          props.setTotalPages(res.data.totalPages);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    // };

    // Set a timeout to execute the function after 2000 milliseconds (2 seconds)
    // const timeoutId1 = setTimeout(delayedAction, 500);

    // axios
    //   .get(`${SEARCHING_API}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     setProducts(res.data.content);
    //     props.setTotalPages(res.data.totalPages);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // return () => {
    //   clearTimeout(timeoutId1);
    // };
  }, [props, shouldRender, query, isSearching]);
  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <svg
            className="tea"
            width="100"
            height="100"
            viewBox="0 0 37 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
              stroke="var(--secondary)"
              stroke-width="2"
            ></path>
            <path
              d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
              stroke="var(--secondary)"
              stroke-width="2"
            ></path>
            <path
              id="teabag"
              fill="var(--secondary)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"
            ></path>
            <path
              id="steamL"
              d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="var(--secondary)"
            ></path>
            <path
              id="steamR"
              d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13"
              stroke="var(--secondary)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <h3 style={{ color: "#7C81AD" }}>Loading....</h3>
        </div>
      ) : products ? (
        products?.map((item) => {
          const { id, name, image, price, sale, markDtoResponse } = item;
          return (
            <div key={id} className="col-lg-4 col-md-4 col-sm-6">
              <div className="collection-card">
                {markDtoResponse?.tag === "" ? (
                  ""
                ) : (
                  <div
                    className={
                      markDtoResponse?.tagBadge === ""
                        ? "offer-card"
                        : `offer-card ${markDtoResponse?.tagBadge}`
                    }
                  >
                    <span>{markDtoResponse?.tag}</span>
                  </div>
                )}

                <div className="collection-img">
                  <Link to={`/shop-details/${id}`}>
                    <img
                      className="hover_image"
                      style={{ width: "200px", height: "200px" }}
                      src={image}
                      alt=""
                    />
                  </Link>

                  <div className="view-dt-btn">
                    <div className="plus-icon">
                      <i className="bi bi-plus" />
                    </div>
                    <Link to={`/shop-details/${id}`}>View Details</Link>
                  </div>
                  <ul className="cart-icon-list"></ul>
                </div>
                <div className="collection-content text-center">
                  <h4>
                    <Link to={`/shop-details/${id}`}>{name}</Link>
                  </h4>
                  <div className="price">
                    <h6>${discoutPrice(price, sale)}</h6>
                    {sale !== 0 && <del>${price}</del>}
                  </div>
                  <div className="review"></div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Items not found</div>
      )}
    </>
  );
}
export default ShopCard;
