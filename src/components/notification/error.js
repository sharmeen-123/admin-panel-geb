import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AuthContext } from "../../App";
import React, {useContext} from 'react';

export const NotiError = () => {
    const { msg, setMsg } = useContext(AuthContext);
  return (
          notifications.show({
            title: 'Error',
            message: msg,
            color:'red'
          })
     
  );
}