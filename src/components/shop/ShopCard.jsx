import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { searchStart, updateQuery } from "../../redux/searchSlice";
import { sentRequest } from "../../pages/ServicePackage";
import {
  GET,
  POST,
  URL_FAVORITE_PRODUCT,
} from "../../utilities/constantVariable";

function discoutPrice(price, sale) {
  return price * (1 - sale / 100);
}

function ShopCard(props) {
  const dispatch = useDispatch();
  const CATEGORY_API =
    process.env.REACT_APP_FETCH_API +
    `/products?size=${props.sizePages}&page=${props.currentPage}&categoryIds=${props.checkedCategory}`;
  const [products, setProducts] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const query = useSelector((state) => state.search.query);
  const isLogin = useSelector((state) => state.auth.login?.currentUser);

  const isSearching = useSelector((state) => state.search.isSearching);

  console.log({ query });
  console.log({ isSearching });
  let token = "";
  let userId = 0;
  if (isLogin) {
    token = isLogin.token;
    userId = isLogin.userDtoResponse.id;
  }
  const FAVORITE_PRODUCTS_API = `http://localhost:8080/api/favorites/user/${userId}`;
  const SEARCHING_API =
    process.env.REACT_APP_FETCH_API + `/products/search?query=${query}`;
  const [productFavorites, setProductFavorites] = useState([]);
  // setProductFavorites(sentRequest(FAVORITE_PRODUCTS_API,GET,null,token));
  const [arrayIdProductFavorite, setArrayIdProductFavorite] = useState([]);
  useEffect(() => {
    if (isSearching) {
      // dispatch(updateQuery(""));
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
          console.log(err);
        });
    } else {
      axios
        .get(`${CATEGORY_API}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.content);
          props.setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    CATEGORY_API,
    props,
    shouldRender,
    arrayIdProductFavorite.length,
    query,
    isSearching,
  ]);

  useEffect(() => {
    axios
      .get(`${FAVORITE_PRODUCTS_API}`)
      .then((res) => {
        const arrayProductId = [];
        res.data?.favoriteProductDtoResponses?.forEach((item) => {
          arrayProductId.push(item.productDtoResponse.id);
        });
        setArrayIdProductFavorite(arrayProductId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  const addInFavoriteListHandler = (props) => {
    setArrayIdProductFavorite((prevState) => [...prevState, props]);
    setShouldRender(!shouldRender);
    const body = { userId, productId: props };
    const res = sentRequest(URL_FAVORITE_PRODUCT, POST, body, token);
  };
  console.log({ products });
  

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
                {arrayIdProductFavorite?.includes(id) && (
                  <div className={"cart-icon-list-favorite favorite-yes"}>
                    <li>
                      <a>
                        <img
                          src="/assets/images/icon/Icon-favorites3.svg"
                          alt=""
                        />
                      </a>
                    </li>
                  </div>
                )}

                <div className="collection-img">
                  <Link legacyBehavior to={`/shop-details/${id}`}>
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
                    <Link legacyBehavior to={`/shop-details/${id}`}>
                      <a>View Details</a>
                    </Link>
                  </div>
                  <ul className="cart-icon-list">
                    <li onClick={addInFavoriteListHandler.bind(null, id)}>
                      <a>
                        <img
                          src="/assets/images/icon/Icon-favorites3.svg"
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="collection-content text-center">
                  <h4>
                    <Link legacyBehavior to={`/shop-details/${id}`}>
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
