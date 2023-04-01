import React from 'react';
import { notifications } from '@mantine/notifications';
import { Group, Button } from '@mantine/core';

export const Demo = () => {
  const handleClick = () => {
    notifications.show({
      title: 'Default notification',
      message: 'Hey there, your code is awesome! 🤥',
    });
  };

  return (
    <>
      {notifications.notificationsContainer}
      <Group position="center">
        <Button onClick={handleClick}>Show notification</Button>
      </Group>
    </>
  );
};
