import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import "./PaymentForm.css";
import { AuthContext } from "../../App"

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}

export default function PaymentForm(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [users, setusers] = useState(false);
  const [name, setName] = useState(false);
  const [id, setId] = useState(false);
  const [hours, setHours] = useState(0);
  const [wage, setWage] = useState(0);
  const [payment, setPayment] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [email, setEmail] = useState(false);
  const [image, setImage] = useState("abc");
  const {update, setUpdate } = useContext(AuthContext);

  // getting users info

 
  const Users = async () => {
    let res = await axios.get('/user/getAllUsers')
      .then((res) => {
        setusers(res.data.data);
        console.log("users", res.data.data);
        if(props.update){
          setWage(props.update.wage);
          setHours(props.update.totalHours);
          setPayment(props.update.paidAmount)
        }else{
          setWage(0);
          setHours(0);
          setPayment(0);
          setName(users[0].firstName+" "+users[0].lastName);
          setId(users._id)
          if(users[0].image){
          setImage(users[0].image)}
          console.log("image...",image)
          setEmail(users[0].email)
            }
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  const select = async (e) => {
    console.log("in select")
    // if(user){
    //   setSelectedUser(user)
    // }
    let id = e.target.value
    console.log(id)
    // const user = (id) => {
      const user = users.find(person => person._id === id);
    //   return person ? person.age : null;
    // };
    setName(user.firstName+ " "+ user.lastName);
    console.log("name...",name)
    setId(user._id)
    console.log("id....",id)
    if(user.image){
    setImage(user.image)}
    console.log("image...",image)
    setEmail(user.email)
    console.log("email...",email)
    console.log("propss...", props.update)
    // console.log(name, id)
    // console.log("userrr ",user);
    if(!props.update){
      totalHours()
    }else{
      setHours(props.update.totalHours)
    }
    
  }


  // getting total hours of a uset
  const totalHours = async () => {
    if (id) {
      let res = await axios.get('/shifts/getNumberOfHours/' + id)
        .then((res) => {
          setHours(res.data.data.totalHours);
          setShifts(res.data.data.shifts)
          console.log("hourss", res.data.data)
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }
  }
  const payAmount = async () => {
    let res = await axios.post('/payment/addpayment',{userName: name, userID: id, wage: +wage, paidAmount:+payment, totalHours: +hours, shifts:shifts, userEmail:email, userImage:image})
        .then((res) => {
          // setHours(res.data.data);
          console.log("hourss", res.data.data)
          setHours(res.data.data);
          console.log("hourss", res.data.data);
          setWage(0);
          setHours(0);
          setPayment(0);
          setName(users[0].firstName+" "+users[0].lastName);
          setId(users._id)
          if(users[0].image){
          setImage(users[0].image)}
          console.log("image...",image)
          setEmail(users[0].email)
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
  }

  const updateAmount = async () => {
    console.log(name)
    let res = await axios.put('/payment/updatePayment/'+props.update._id,{userID: id, userName: name, wage: +wage, paidAmount:+payment, totalHours: +hours, shifts:shifts, userEmail:email, userImage:image})
        .then((res) => {
          setHours(res.data.data);
          console.log("hourss", res.data.data);
          setWage(0);
          setHours(0);
          setPayment(0);
          setName(users[0].firstName+" "+users[0].lastName);
          setId(users._id)
          if(users[0].image){
          setImage(users[0].image)}
          console.log("image...",image)
          setEmail(users[0].email)
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
  }


  function togglePopup(pay) {
    setShowPopup(!showPopup);
    if(pay && name){
      if(props.update){
        updateAmount()
      }else{
        payAmount()
      }
      
    }
  }


  useEffect(() => {
    Users();
    if(props.update){
      setWage(props.update.wage);
      setHours(props.update.totalHours);
      setPayment(props.update.paidAmount);
      setName(props.update.userName);
      setId(props.update.userID)
      if(props.update.image){
      setImage(props.update.image)}
      console.log("image...",image)
      setEmail(props.update.userEmail)
    }else{
      setWage(0);
      setHours(0);
      setPayment(0)
    }
  }, [])

  //   const totalpayment = hourly_wage * total_hours;

  return (
    <div className="Paymentform">
      <div className="main">
        <h1>Calculate Payment</h1>
        <div>
          <label>Choose User:</label> <br />
         
            <select className="select" onChange={select}>
            {users === false ? (<></>) : (<>
            {props.update?(<>
              <option className="option" value={id} onClick={() => select(props.update)}>{name}</option>
            </>):(<></>)}
              {users.map((user) => (
                <option className="option" value={user._id} onClick={() => select(user)}>{user.firstName + " " + user.lastName}</option>
              ))}
              </>)}
            </select>
          
        </div>
        <div className="small_cont">
          <div>
            <label>Hourly Wage :</label> <br />
              <input type="number" value={wage} placeholder="Enter Hourly wage" onChange={(e)=>{setWage(e.target.value)
                                                                                  setPayment(wage*hours)}}/>
           
            
          </div>
            <div>
            <label>Total Hours :</label> <br />
            <input type="number" value={hours} placeholder="Enter Total Hours" onChange={(e)=>{setHours(e.target.value)
                                                                                                setPayment(wage*hours)}}/>
          </div>
          
        </div>
        <div className="small_cont">
          <div>
            {props.update?(<>
              <div>
              <label>Total Payment: :</label> <br />
              <input type="number" value={payment} placeholder="Your Total Payment is" onChange={(e)=>setPayment(e.target.value)}/>
            </div></>):(<>
              <div>
              <label>Total Payment: :</label> <br />
              <input type="number" value={wage*hours} placeholder="Your Total Payment is" onChange={(e)=>setPayment(e.target.value)}/>
            </div></>)}
            </div>
            
            <div className="btncont">
              <button onClick={togglePopup} className="reset">
                Reset
              </button>
              
              <button onClick={togglePopup} className="pay">Pay</button>
              {showPopup && (
                <Popup>
                  <h1>Confirm Payment</h1>
                  <p>You want to pay .</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input onClick={togglePopup(true)} value="Yes"/>
                    <button className="red" onClick={togglePopup}>
                      No
                    </button>
                  </div>
                </Popup>
              )}
            </div>
          </div>
          </div>
      
    </div>
  );
}
