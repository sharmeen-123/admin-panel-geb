import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AuthContext } from "../../App";
import React, {useContext, useEffect} from 'react';

export const Noti = () => {
    const { msg, setMsg } = useContext(AuthContext);
const { alrt, setAlrt } = useContext(AuthContext);
useEffect(() => {
  notifications.cleanQueue();
});

// useEffect(() => {
//   if (alrt) {
//     const timeoutId = setTimeout(() => {
//       setAlrt(false);
//     }, 500); // set timeout to 20 seconds (20000 milliseconds)

//     // return a cleanup function to cancel the timeout if the component unmounts
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }
// }, [alrt]);

return (
  notifications.show({
    title: 'notification',
    message: msg,
    color:'green',
    autoClose: 1000,
    withCloseButton: true,
  })
);

}