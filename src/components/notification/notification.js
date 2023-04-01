import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Noti } from './noti';

export const Demo = ()=> {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles TealwithIcon>
      <Notifications />
      <Noti />
    </MantineProvider>
  );
}