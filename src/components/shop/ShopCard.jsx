import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector} from "react-redux";

function discoutPrice(price, sale) {
  return price * (1 - sale / 100);
}

function ShopCard(props) {
  const [products, setProducts] = useState(props.products);
  const [shouldRender, setShouldRender] = useState(false);
  const query = useSelector((state) => state.search.query);
  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const isSearching = useSelector((state) => state.search.isSearching);
  let token = "";
  let userId = 0;
  if (isLogin) {
    token = isLogin.token;
    userId = isLogin.userDtoResponse.id;
  }
  const loading = () => {
    return (
      <div class="preloader">
        <svg
          class="cart"
          role="img"
          aria-label="Shopping cart line animation"
          viewBox="0 0 128 128"
          width="128px"
          height="128px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="8"
          >
            <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g class="cart__lines" stroke="currentColor">
              <polyline
                class="cart__top"
                points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                stroke-dasharray="338 338"
                stroke-dashoffset="-338"
              />
              <g class="cart__wheel1" transform="rotate(-90,43,111)">
                <circle
                  class="cart__wheel-stroke"
                  cx="43"
                  cy="111"
                  r="13"
                  stroke-dasharray="81.68 81.68"
                  stroke-dashoffset="81.68"
                />
              </g>
              <g class="cart__wheel2" transform="rotate(90,102,111)">
                <circle
                  class="cart__wheel-stroke"
                  cx="102"
                  cy="111"
                  r="13"
                  stroke-dasharray="81.68 81.68"
                  stroke-dashoffset="81.68"
                />
              </g>
            </g>
          </g>
        </svg>
        <div class="preloader__text">
          <p class="preloader__msg">Bringing you the goods…</p>
          <p class="preloader__msg preloader__msg--last">
            This is taking long. Something’s wrong.
          </p>
        </div>
      </div>
    );
  }
  const SEARCHING_API =
    process.env.REACT_APP_FETCH_API + `/products/search?query=${query}`;
  useEffect(() => {
      axios
        .get(`${SEARCHING_API}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.content);
          props.setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [
    props,
    shouldRender,
    query,
    isSearching,
  ]);
  return (
    <>
      {products ? (
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
                    <Link to={`/shop-details/${id}`}>
                     View Details
                    </Link>
                  </div>
                  <ul className="cart-icon-list">
                  </ul>
                </div>
                <div className="collection-content text-center">
                  <h4>
                    <Link to={`/shop-details/${id}`}>
                      {name}
                    </Link>
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
