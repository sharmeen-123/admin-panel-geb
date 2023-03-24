import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import MainUsers from "./components/Users/MainUsers";
import Adduser from "./components/Users/Adduser";
// import PaymentForm from "./components/Payment/PaymentForm";
import PaymentUsers from "./components/Payment/PaymentUsers";
// import { NavbarNested } from "./components/sidebar/Navbar";
import Tracking from "./components/tracking/tracking";
import Map from "./components/tracking/userInfo";
import { GetInTouch } from "./components/Users/AddUser2";
import "./App.css"
import { NavbarNested2 } from "./components/sidebar/Navbar2";
import { PaymentForm } from "./components/Payment/PymentForm3";
import { HeaderTabs } from "./components/Payment/header/header";
export const AuthContext = React.createContext();

const AdminSideBarLayout = () => {
  return (
    <div className={"main_div"} style={{display:"grid",
      backgroundColor:"white",
      overflow:"hidden",
      "grid-template-columns": "15rem auto"}}>
      {/* <div className="nav-bar"> */}
        {/* <NavbarNested /> */}
        <div style={{overflow:"hidden", borderRight:"2px solid #f5f6fa"}}>
        <NavbarNested2/>
        </div>
        
      {/* </div> */}
      {/* <Sidebar/> */}
      <div style={{overflow:"scroll"}}>
      <Outlet />
      </div>
      
    </div>
  );
};

function App() {

  const [update, setUpdate] = useState(false);
  const [location, setLocation] = useState();
  const [user, setUser] = useState();
  const[shifts, setShifts] = useState()
  const value = {
    setUpdate: setUpdate,
    update: update,
    location: location,
    setLocation: setLocation,
    user: user,
    setUser: setUser,
    shift: shifts,
    setShift: setShifts

  };
  console.log(process.env.REACT_APP_API)
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <div className="App">
          <Routes>

            <Route exact element={<AdminSideBarLayout />} >
              <Route exact path="/" element={<MainDash />} />
              <Route exact path="/mainUsers" element={<MainUsers />} />
              {/* <Route exact path="/addUser" element={<Adduser update={false} />} /> */}
              <Route exact path="/addUser" element={<GetInTouch update={false} />} />
              <Route exact path="/updateUser" element={<GetInTouch update={update} />} />
              <Route exact path="/paymentForm" element={<PaymentForm update={false} />} />
              <Route exact path="/updatePaymentForm" element={<PaymentForm update={update} />} />
              <Route exact path="/paymentUsers" element={<PaymentUsers />} />
              <Route exact path="/trackUser" element={<Tracking />} />
              <Route exact path="/userInfo" element={<Map />} />
            </Route>
          </Routes>
        </div>
      </Router>

    </AuthContext.Provider>

    // <div className="App">
    //   {/* <Sidebar /> */}
    //   {/* <PaymentForm /> */}
    //   <PaymentUsers />
    //   {/* <MainDash/> */}
    //   {/* <Adduser /> */}
    //   {/* <MainUsers /> */}
    // </div>
  );
}

export default App;
