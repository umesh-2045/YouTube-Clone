import React from "react";
import "./Navbar.css";
import menu from "../../assets/assets/menu.png";
import logo from "../../assets/assets/logo.png";
import search from "../../assets/assets/search.png";
import upload from "../../assets/assets/upload.png";
import more from "../../assets/assets/more.png";
import notification from "../../assets/assets/notification.png";
import user_profile from "../../assets/assets/user_profile.jpg";
import { Link } from "react-router-dom";
const Navbar = ({ setSideBar }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          src={menu}
          alt="Menu Icon"
          onClick={() => setSideBar((prev) => (prev === false ? true : false))}
        />
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img className="search-icon" src={search} alt="Search Icon" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img src={user_profile} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
