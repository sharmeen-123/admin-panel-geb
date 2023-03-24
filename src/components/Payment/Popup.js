import React, { useState } from "react";
import "./popup.css";
export default function Popup(props) {
  const [showPopup, setShowPopup] = useState(false);
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}
