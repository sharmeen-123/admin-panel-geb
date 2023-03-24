import React, { useState, useEffect, useContext } from "react";
import "./PaymnetUsers.css";
import axios from "../../axios";
import { AuthContext } from "../../App"
import { NavLink } from "react-router-dom";
import { TableSelection } from "./PaymentTable";
import { HeaderTabs } from "./header/header";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}

export default function PaymentUsers(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [users, setusers] = useState();
  const [name, setName] = useState(false);
  const [wage, setWage] = useState(0);
  const [payment, setPayment] = useState(0);
  const [hours, setHours] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [image, setImage] = useState(require("../../imgs/upload.png"));
  const [search, setSearch] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const {update, setUpdate } = useContext(AuthContext);

  // api to get all payments
  const payAmount = async () => {
    let res = await axios.get('/payment/getAllPayments')
        .then((res) => {
          setusers(res.data.data);
          console.log("hourss", res.data.data)
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
  }

  const updatePayment = (user) => {
    setUpdate(user)
  }

  const setView = obj => {
    setName(obj.userName);
    if(obj.userImage){
    setImage(obj.userImage);}
    setPayment(obj.paidAmount);
    setHours(obj.totalHours);
    setShifts(obj.shifts);
    setWage(obj.wage);
  }
  const searchName = (e) => {
    setSearch(e);
    console.log(search)
    Search()
  }
  const Search = async () => {
    let res = await axios.get('/payment/getPaymentByName/'+search)
      .then((res) => {
        setusers(res.data.data);
        console.log("users", res.data.data)
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }
   // deleting User
   const deletePayment = async () => {
    console.log("in delete User", deleteId)
    if(deleteId){
      let res = await axios.delete('/payment/deletePayment/'+deleteId)
      .then((res) => {
        // setusers(res.data.data);
        console.log("deleted")
        payAmount()
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
    }
    
  }
  function togglePopup(user, del) {
    setShowPopup(!showPopup);
    if(user){
      setDeleteId(user._id)
    }else if(del === true){
      deletePayment()
    }else{
      setDeleteId(false)
    }
  }
  function togglePopup2(obj) {
    setShowPopup2(!showPopup2);
    setView(obj)
    console.log(obj)
  }

  useEffect(() => {
    payAmount();
  }, [])

  return (
    <div>
      <HeaderTabs user={{ name: "sharmeen", image: "sdsd" }} title={"View Payments"} />
    <div className="cont">
      <div style={{margin:"3vw"}}>
      <TableSelection dataa={users}/>
      </div>
      </div>
      {/* <div className="Main">
        <div className="top-container">
          <div>
            <h4>All Users</h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input type="text" placeholder="Search Users" className="input" onChange={e => searchName(e.target.value)}/>
          </div>
        </div>
        <table>
          <thead>
            <th>Name</th>
            <th>Shifts</th>
            <th>Hours</th>
            <th>Wage per Hour</th>
            <th>Total Payment</th>

            <th>Action</th>
          </thead>
          <tbody>
            {users === false?(<></>):(<>
              {users.map((user) => (
              <tr>
                <td className="hello">
                  {" "}
                  <div className="name-container">
                    {user.userImage?(<>
                      <img src={user.userImage} className="icon" />
                    </>):(<>
                      <img src={require("../../imgs/upload.png")} className="icon" />
                    </>)}
                    
                    <div className="name-container2">
                      <p className="name">{user.userName}</p>
                      <p className="email">{user.userEmail} </p>
                    </div>
                  </div>
                </td>
                <td>{user.shifts}</td>
                <td>{user.totalHours}</td>
                <td>{user.wage}</td>
                <td>{user.paidAmount}</td>

                <td>
                  <div className="button-container">
                    <img
                      src={require("../../imgs/view.png")}
                      className="icon"
                      onClick={() => togglePopup2(user)}
                    />

                    {showPopup2 && (
                      <Popup className="viewpopup">
                        <img
                          src={image}
                          className="dp"
                        />
                        <h1>{name}</h1>
                        <div className="popdiv">
                          <div className="smallpopdiv">
                            <div className="smalldiv">
                              <label className="poplabel">Shifts:</label>
                              <br />
                              <p>{shifts}</p>
                            </div>
                            <div className="smalldiv">
                              <label className="poplabel">Hours:</label>
                              <br />
                              <p>{hours}</p>
                            </div>
                          </div>

                          <div className="smallpopdiv">
                            <div className="smalldiv">
                              <label className="poplabel">Wage per Hour:</label>
                              <br />
                              <p>{wage}</p>
                            </div>
                            <div className="smalldiv">
                              <label className="poplabel">Total Payment:</label>
                              <br />
                              <p>{payment}</p>
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <button onClick={togglePopup2}>Okay</button>
                        </div>
                      </Popup>
                    )}
                    <NavLink
                      to="/updatePaymentForm">
                    <img
                      src={require("../../imgs/pencil.png")}
                      onClick={() => updatePayment(user)}
                      //   className="icon"
                    />
                    </NavLink>
                    <img
                      src={require("../../imgs/disposal.png")}
                      className="icon"
                      onClick={()=>togglePopup(user)}
                    />
                    {showPopup && (
                      <Popup>
                        <h1>Delete Payment</h1>
                        <p>You want to Delete payment .</p>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <button onClick={()=>{togglePopup(false, true);} }>Yes</button>
                          <button className="red" onClick={() => togglePopup(false, false)}>
                            No
                          </button>
                        </div>
                      </Popup>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            </>)}
            
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
