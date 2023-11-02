import { Link, NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useAuthen from "../../../hooks/useAuthen";
import { logoutUser, getUserInfo } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkNoti } from "../../../services/notification";

const NavTop = () => {
  const [notSeenNoti, setNotSeenNoti] = useState(false);
  const {
    isAuthenticated,
    setIsAuthenticated,
    isHomestayOwner,
    setIsHomestayOwner,
  } = useAuthen();
  const [cookies, setCookie, removeCookie] = useCookies([
    "currentuser",
    "userid",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await checkNoti();
      if (res.status === 200) {
        setNotSeenNoti(res.data.notSeen);
      }
    }
    getData();
  }, []);
  console.log({ notSeenNoti });

  const handleLogout = async ({ id, link }) => {
    await logoutUser();
    removeCookie("currentuser");
    removeCookie("userid");
    setIsAuthenticated(false);

    console.log("window.location.pathname", window.location.pathname);
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-hb sticky-top">
      <Link className="navbar-brand" to="/home">
        <img src="../../assets/img/logo2.png" class="logo" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item mr-3">
            <NavLink to="/" className="nav-link ">
              Home
            </NavLink>
          </li>
          {isAuthenticated && !isHomestayOwner && (
            <>
              <li>
                <NavLink to="/bookings/your-bookings" className="nav-link ">
                  Your Bookings
                </NavLink>
              </li>
              {notSeenNoti ? (
                <li
                  onClick={(e) => {
                    setNotSeenNoti(false);
                  }}
                >
                  <NavLink to="/notifications" className="nav-link">
                    Notifications !!!
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/notifications" className="nav-link ">
                    Notifications
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/chats" className="nav-link ">
                  Chats
                </NavLink>
              </li>
            </>
          )}
          {isHomestayOwner && isAuthenticated && (
            <>
              <li className="nav-item mr-3">
                <NavLink to="/homestays/create" className="nav-link ">
                  Create Homestay
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink to="/homestays" className="nav-link ">
                  Homestay Listings
                </NavLink>
              </li>
              <li className="nav-item mr-3">
                <NavLink to="/discounts" className="nav-link ">
                  Discounts
                </NavLink>
              </li>
              <li>
                <NavLink to="/chats" className="nav-link ">
                  Chats
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {!isAuthenticated ? (
          <ul className="navbar-nav ml-auto">
            <li class="nav-item mr-3">
              <NavLink to="/login" className="nav-link ">
                <i class="fas fa-sign-in-alt"></i>
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li class="nav-item mr-3">
              <p className="nav-link " onClick={handleLogout}>
                <i class="fas fa-sign-in-alt"></i>
                Logout
              </p>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
export default NavTop;
