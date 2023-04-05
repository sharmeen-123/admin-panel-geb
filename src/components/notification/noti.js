import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AuthContext } from "../../App";
import React, {useContext, useEffect} from 'react';

export const Noti = () => {
    const { msg, setMsg } = useContext(AuthContext);

useEffect(() => {
  console.log("in notii")
  notifications.show({
    title: 'notification',
    message: msg,
    color:'green',
    autoClose: 5000,
    withCloseButton: true,
  })
  notifications.cleanQueue();
},[]);


return (
  <></>
  // notifications.show({
  //   title: 'notification',
  //   message: msg,
  //   color:'green',
  //   autoClose: 5000,
  //   withCloseButton: true,
  // })
);

}