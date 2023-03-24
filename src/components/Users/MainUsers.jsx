import React, { useState, useEffect } from "react";
import Userscard from "./Userscard";
import "./MainUsers.css";
import Tables from "./Tables";
import axios from "../../axios";
import { TableSort } from "./Table2";
// import "./Tables.css"
import {TableSelection} from "./Table3"
import { HeaderTabs } from "../Payment/header/header";

export default function MainUsers() {
  const [users, setusers] = useState()
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

    
  useEffect(() => {
    Users();
  }, [])

  
  return (
    <div >
      
      <HeaderTabs user={{ name: "sharmeen", image: "sdsd" }} title={"View User"} />
      <div style={{ backgroundColor: "#f5f6fa",  borderRadius:'3%',  margin: '1.3%'}}>
      <Userscard />
      <div style={{margin:"2vw"}}>
      {/* <TableSort data={users}/> */}
      <TableSelection dataa={users}/>
      </div>
      </div>
      {/* <Tables /> */}
    </div>
  );
}
