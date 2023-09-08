import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiRequest";
import { getUserDetail } from "../redux/userRequest";

export const UserInfo = () => {
  const isLogin = useSelector((state) => state.auth.login?.currentUser);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(isLogin.token);
    setUser(isLogin.userDtoResponse);
  }, [isLogin]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch, navigate);
  };
  const handleGetUserDetail = () => {
    getUserDetail(user.id, token, dispatch, navigate);
  };
  return (
    <>
      <div className="info">
        <div>
          <p className="infor-divnkusername">
            Hi! {isLogin.userDtoResponse.userName}
          </p>
        </div>
        <hr />
        <ul className="inforuserul">
          <li>
            <Link to="/order" className="none-border-circle custom-tag">
              <span
                className="infor-link"
                style={{ font: "1rem", textAlign: "center" }}
              >
                Your order
              </span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="none-border-circle custom-tag">
              <span className="infor-link" onClick={handleGetUserDetail}>
                Profile
              </span>
            </Link>
          </li>
          <li className="inforuserli">
            <Link
              to="/updatePassword"
              className="none-border-circle custom-tag"
            >
              <span className="infor-link">Settings</span>
            </Link>
          </li>
          <li className="inforuserli">
            <Link to="/login" className="none-border-circle custom-tag">
              <span className="infor-link" onClick={handleLogout}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
        <div className="footer-infor"></div>
      </div>
    </>
  );
};
export default UserInfo;
