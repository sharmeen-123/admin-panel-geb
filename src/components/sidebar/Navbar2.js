import { Navbar, Group, Code, ScrollArea, createStyles, rem, Text } from '@mantine/core';
import {
    IconHome2,
    IconMapPinFilled,
    IconSettings,
    IconBrandMastercard,
    IconUser,
} from '@tabler/icons-react';
// import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from './NavbarLink2';
import  Logo  from "../../imgs/logo.png";

const mockdata = [
    { label: 'Dashboard', icon: IconHome2, link: '/', number:1 },
    {
      label: 'Users',
      icon: IconUser,
      initiallyOpened: true,
      link:"/addUser",
      number:2,
      links: [
        { label: 'Add User', link: '/addUser', number2:2.1 },
        { label: 'View User', link: '/mainUsers',number2:2.2 }
      ],
    },
    { label: 'Tracking', icon: IconMapPinFilled, link: '/trackUser', number:3 },
    {
      label: 'Payments',
      icon: IconBrandMastercard,
      link:"/paymentForm",
      number:4,
      links: [
        { label: 'Add Payment', link: '/paymentForm', number2:4.1 },
        { label: 'View Payment', link: '/paymentUsers', number2:4.2 },
      ],
    },
   
  ];

const useStyles = createStyles((theme) => ({
  navbar: {
    position:"sticky"  ,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    // backgroundColor:"red",
    overflow:"hidden",
    paddingBottom: 0,
    width:"18vw"
    // borderRight:"2px solid #f5f6fa"

  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    paddingBottom:0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    // borderBottom: `${rem(1)} solid ${
    //   theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    padding:0,
    marginTop:0,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },
}));

export function NavbarNested2() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const settings = {label: 'Settings', icon: IconSettings}

  return (
    <Navbar  p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group>
            <img src={Logo} style={{width:"4vw", margin:"0"}}/>
            <Text style={{fontWeight:"700", fontSize:"2vw"}}>GEB</Text>
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