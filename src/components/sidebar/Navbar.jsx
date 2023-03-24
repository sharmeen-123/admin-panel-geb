import { Navbar, Group, Code, ScrollArea, createStyles, rem, Text } from '@mantine/core';
import {

  IconHome2,
  IconMapPinFilled,
  IconSettings,
  IconBrandMastercard,
  IconUser,
} from '@tabler/icons-react';
import {LinksGroup} from './NavbarLink'
import Logo from "../../imgs/logo.png";

const mockdata = [
  { label: 'Dashboard', icon: IconHome2, link: '/' },
  {
    label: 'Users',
    icon: IconUser,
    initiallyOpened: true,
    links: [
      { label: 'Add User', link: '/addUser' },
      { label: 'View User', link: '/mainUsers' }
    ],
  },
  { label: 'Tracking', icon: IconMapPinFilled, link: '/trackUser' },
  {
    label: 'Payments',
    icon: IconBrandMastercard,
    links: [
      { label: 'Add Payment', link: '/paymentForm' },
      { label: 'View Payment', link: '/paymentUsers' },
    ],
  },
 
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white
    }`,
  },
  logo:{
    width:'5vw',
  },
  heading:{
    fontWeight:"bolder"
  },
  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(.2)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white
    }`,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const settings = {label: 'Settings', icon: IconSettings}

  return (
    <Navbar  p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          {/* <Logo /> */}
          <img src={Logo} className={classes.logo}/>
          
          <Text lg={{ fontWeight: 700 }} className={classes.heading}>Good Earth Builders</Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
      <div ><LinksGroup { ...settings } key={settings.label} /></div>
        
      </Navbar.Section>
    </Navbar>
  );
}