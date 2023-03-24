import axios from "../../axios";
import Cards from "../Cards/Cards";
import Charts from "../Charts/Charts";
import React, {useEffect, useState} from "react";
import "./MainDash.css";
import { HeaderTabs } from "../Payment/header/header";

function MainDash(props) {
  const [shifts, setShifts] = useState('');
  const [users, setUsers] = useState('');
  const [prevShifts, setPrevShifts] = useState("");
  const [payment, setPayment] = useState("");
  const [prevAmount, setPrevAmount] = useState("")

   // getting shifts info
   const Shifts = async () => {
    let res = await axios.get('/shifts/getNumberOfShifts')
    .then ((res) => {
      setShifts(res.data.data);
      // console.log("shifts",res.data.data)
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }

  // getting users info
  const Users = async () => {
    let res = await axios.get('/user/getNumberOfUsers')
    .then ((res) => {
      setUsers(res.data.data);
      console.log("users",res.data.data)
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }

   // getting previous Shifts info
   const previousShifts = async () => {
    let res = await axios.get('/cycle/getAllcycles')
    .then ((res) => {
      setPrevShifts(res.data.data);
      console.log("previous shifts...",res.data.data)
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }
   // getting payment info
   const paidAmount = async () => {
    let res = await axios.get('/payment/getAmountPaid')
    .then ((res) => {
      setPayment(res.data);
      console.log("payments...",res.data)
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }
    // getting payment info
    const previousAmount = async () => {
      let res = await axios.get('/payment/getAllcycles')
      .then ((res) => {
        setPrevAmount(res.data.data);
        console.log("prev payments...",res.data.data)
      }
        
      )
      .catch((error) => {
          // setError(error.response.data);
          console.log(error);
      })
    }
  useEffect (()=>{
    Shifts();
    Users();
    previousShifts();
    paidAmount();
    previousAmount();
  },[])
  return (
    <div>
      <HeaderTabs user={{name:"sharmeen", image:"sdsd"}} title={"Dashboard"}/>
    <div className="MainDash">
      <Cards users={users} shifts={shifts} amount={payment}/>
      {/* <Charts users={users} shifts={shifts} prevShifts={prevShifts} amount={payment} prevAmount={prevAmount}/> */}
    </div>
    </div>
  );
}

export default MainDash;
