import React, { useState, useEffect } from 'react';
import {PaymentForm} from "./PaymentForm2"

const  payment =() => {
    const [data, setData] = useState()
    const Users = async () => {
        let res = await axios.get('/user/getAllUsers')
          .then((res) => {
            setData(res.data.data);
            console.log("users", res.data.data);
            
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
    <div>
      <PaymentForm data={data} update={false}/>
    </div>
  )
}

export default payment
