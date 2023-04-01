import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AuthContext } from "../../App";
import React, {useContext, useEffect} from 'react';

export const NotiError = () => {
    const { msg, setMsg } = useContext(AuthContext);
    const { alrt, setAlrt } = useContext(AuthContext);

    useEffect(() => {
        setAlrt(false)
      }, [])

  return (
          notifications.show({
            title: 'Error',
            message: msg,
            color:'red'
          })
     
  );
}