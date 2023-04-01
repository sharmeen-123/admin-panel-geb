import React, { useState, useEffect, useContext } from "react";
import Userscard from "./Userscard";
import "./MainUsers.css";
import axios from "../../axios";
import {TableSelection} from "./Table3"
import { HeaderTabs } from "../header/header";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { AuthContext } from "../../App";
import Loading from "../Loader/loading";

import { Demo } from '../notification/notification';

export default function MainUsers() {
  const [users, setusers] = useState()
  const {alrt, setAlrt} = useContext(AuthContext);
  const {msg, setMsg} = useContext(AuthContext);
  const [user, setUsers] = useState(false)
    // getting users info
    const Users = async () => {
      let res = await axios.get('/user/getAllUsers')
        .then((res) => {
          setusers(res.data.data);
        }
  
        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

    // getting users info
    const Userss = async () => {
      let res = await axios.get('/user/getNumberOfUsers')
      .then ((res) => {
        setUsers(res.data.data);
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

    
  useEffect(() => {
    Users();
    Userss()
  }, [])

  
  return (
    
    <div >
      
      <HeaderTabs title={"View User"} />
      {alrt?(<>
        <Demo/>
      </>):(<></>)}
      
        {user && users?(<>
          <div style={{ backgroundColor: "#f5f6fa",  borderRadius:'3%',  margin: '1.3%', paddingBottom:"5%"}}>
          <Userscard user={user}/>
      <div style={{margin:"2%"}}>
      <TableSelection dataa={users}/>
      </div>
      </div>
      </>):(<>
      <Loading/>
      </>)}
    </div>
  );
}
