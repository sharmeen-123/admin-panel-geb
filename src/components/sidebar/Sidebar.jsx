import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import Logo from "../../imgs/logo.png";

import { Sidebardata } from "../../Data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../App"

function Sidebar() {
  const [selected, setselected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {update, setUpdate } = useContext(AuthContext);
  const select = (index) => {
    setselected(index);
    setUpdate(false);
  }
  return (
    <div className="Sidebar">
      <div className="logo">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        />
        <img src={Logo} className="pic" />
        <span>GEB</span>
      </div>

      <div className="menu">
        {Sidebardata.map((item, index) => {
          return (
            <NavLink
            to={item.link}>
              <div
              className={selected === index ? "menuItems active" : "menuItems"}
              key={index}
              onClick={() => select(index)}
            >
              <img src={item.icon} />

              <span>{item.heading}</span>
            </div>
            </NavLink>
            
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
