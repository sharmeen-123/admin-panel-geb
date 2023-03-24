import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
// import "./Tables.css";
import { AuthContext } from "../../App";
import { NavLink } from "react-router-dom";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}

export default function Tables() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [id, setId] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false);
  const [designation, setDesignation] = useState(false);
  const [address, setAddress] = useState(false);
  const [image, setImage] = useState(require("../../imgs/upload.png"))
  const [users, setusers] = useState(false);
  const [search, setSearch] = useState(false);
  const { update, setUpdate } = useContext(AuthContext);
  function togglePopup(user, del) {
    setShowPopup(!showPopup);
    if (user) {
      setId(user._id)
    } else if (del === true) {
      deleteUser()
    } else {
      setId(false)
    }
  }
  function togglePopup2() {
    setShowPopup2(!showPopup2);
  }

  const viewUser = (user) => {
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setDesignation(user.userType);
    if(user.image){
    setImage(user.image);}
    if (address) {
      setAddress(user.address)
    } else {
      setAddress("Null")
    }
  }
  // getting users info
  const Users = async () => {
    let res = await axios.get('/user/getAllUsers')
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

  // switching verification
  const verification = async (id) => {
    console.log("in verification", id)
    let res = await axios.put('/user/verifyUser/' + id)
      .then((res) => {
        // setusers(res.data.data);
        console.log("updatedd")
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching status
  const status = async (id) => {
    console.log("in status", id)
    let res = await axios.put('/user/switchUserStatus/' + id)
      .then((res) => {
        // setusers(res.data.data);
        console.log("updatedd")
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // deleting User
  const deleteUser = async () => {
    console.log("in delete User", id)
    if (id) {
      let res = await axios.delete('/user/deleteUser/' + id)
        .then((res) => {
          // setusers(res.data.data);
          console.log("deleted")
          Users()
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    Search()
  }

  // searching user
  const Search = async () => {
    let res = await axios.get('/user/getUserByName/' + search)
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

  useEffect(() => {
    Users();
  }, [])

  return (
    <div className="Main">
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
          <input type="text" placeholder="Search Users" className="input" onChange={handleSearch} />
        </div>
      </div>
      <table>
        <thead>
          <th>Name</th>
          <th>Date Joined</th>
          <th>Designation</th>
          <th>Status</th>
          <th>Verified</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users === false ? (<></>) : (<>
            {users.map((user, ind) => (
              <tr>
                <td className="hello">
                  {" "}
                  <div className="name-container">
                    {user.image?(<>
                      <img src={user.image} className="icon" />
                    </>):(<>
                      <img src={require("../../imgs/upload.png")} className="icon" />
                    </>)}
                    
                    <div className="name-container2">
                      <p className="name">{user.firstName + " " + user.lastName}</p>
                      <p className="email">{user.email} </p>
                    </div>
                  </div>
                </td>
                <td>{user.dateJoined}</td>
                <td>{user.userType}</td>
                <td>
                  {user.status === "block" ? (<>
                    <select onChange={e => status(user._id)}>

                      <option value="block">block</option>

                      <option value="unblock">unblock</option>

                    </select></>) : (<>
                      <select onChange={e => status(user._id)}>

                        <option value="unblock">unblock</option>

                        <option value="block">block</option>

                      </select></>)}
                </td>
                <td>
                  {user.verified === true ? (<>
                    <select onChange={e => verification(user._id)}>

                      <option value="verify">verify</option>

                      <option value="disprove">disprove</option>

                    </select></>) : (<>
                      <select onChange={e => verification(user._id)}>
                        <option value="disprove">disprove</option>
                        <option value="verify">verify</option>
                      </select></>)}

                </td>
                <td>
                  <div className="button-container" onClick={() => viewUser(user)}>
                    <img
                      src={require("../../imgs/view.png")}
                      className="icon"
                      onClick={togglePopup2}
                    />

                    {showPopup2 && (
                      <Popup className="viewpopup">
                        <img src={image} className="dp" />
                        <h1>{name}</h1>
                        <div className="popdiv">
                          <div className="smallpopdiv">
                            <div className="smalldiv">
                              <label className="poplabel">Email:</label>
                              <br />
                              <p>{email}</p>
                            </div>
                            <div className="smalldiv">
                              <label className="poplabel">Contact:</label>
                              <br />
                              <p>{phone}</p>
                            </div>
                          </div>

                          <div className="smallpopdiv">
                            <div className="smalldiv">
                              <label className="poplabel">Designation:</label>
                              <br />
                              <p>{designation}</p>
                            </div>
                            <div className="smalldiv">
                              <label className="poplabel">Address:</label>
                              <br />
                              <p>{address}</p>

                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <button onClick={togglePopup2}>Okay</button>
                        </div>
                      </Popup>
                    )}

                    <NavLink
                      to="/updateUser">
                      <img
                        src={require("../../imgs/pencil.png")}
                        onClick={() => setUpdate(user)}
                      //   className="icon"
                      />
                    </NavLink>
                    <img
                      src={require("../../imgs/disposal.png")}
                      className="icon"
                      onClick={() => togglePopup(user)}
                    />
                    {showPopup && (
                      <Popup>
                        <h1>Delete User</h1>
                        <p>You want to Delete User.</p>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <button onClick={() => { togglePopup(false, true); }}>Yes</button>
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
    </div>
  );
}
