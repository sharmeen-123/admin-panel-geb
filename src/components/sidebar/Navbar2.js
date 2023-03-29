import { Navbar, Group, Code, ScrollArea, createStyles, rem, Text } from '@mantine/core';

import { LinksGroup } from './NavbarLink2';
import  Logo  from "../../imgs/logo.png";
import React, {useState, useEffect} from 'react';
import IconApps from '../../imgs/dashboard.png';
import IconUsers from '../../imgs/group.png'
import IconMapPin from '../../imgs/pin.png'
import IconCoin from '../../imgs/money-exchange.png'
import IconSettings from '../../imgs/settings.png'
import './Navbar.css'



// const IconHome2 = <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
// <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
// <rect x="4" y="4" width="6" height="6" rx="1" />
// <rect x="4" y="14" width="6" height="6" rx="1" />
// <rect x="14" y="14" width="6" height="6" rx="1" />
// <line x1="14" y1="7" x2="20" y2="7" />
// <line x1="17" y1="4" x2="17" y2="10" />
// </svg>

const useStyles = createStyles((theme) => ({
  navbar: {
    // position:"fixed"  ,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    // backgroundColor:"red",
    // overflow:"hidden",
    paddingBottom: 0,
    // width:"18vw",
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
  const [openedLink, setOpenedLink] = useState(null); // state to track which link is opened
  const [mockdata, setMockData] = useState([
    { label: 'Dashboard', icon: IconApps, link: '/', number:1 },
    {
      label: 'Users',
      icon: IconUsers,
      initiallyOpened: false,
      link:"/",
      number:2,
      links: [
        { label: 'Add User', link: '/addUser', number2:2.1 },
        { label: 'View User', link: '/mainUsers',number2:2.2 }
      ],
    },
    { label: 'Tracking',
     icon: IconMapPin,
      link: '/',
      initiallyOpened: false,
       number:3,
    links: [
      { label: 'Track Employees', link: '/trackUser', number2:3.1, },
    ],
     },
    {
      label: 'Payments',
      icon: IconCoin,
      link:"/",
      initiallyOpened: false,
      number:4,
      links: [
        { label: 'Add Payment', link: '/paymentForm', number2:4.1 },
        { label: 'View Payment', link: '/paymentUsers', number2:4.2 },
      ],
    },
   
  ])

  const [opened, setOpened] = useState({
    [mockdata.label]: true,
  });

  const links = mockdata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      isOpened={openedLink} // pass down whether the link is opened
      setOpenLink={setOpenedLink} // pass down function to update openedLink state
      setOpened = {setOpened}
      opened={opened}
    />
  ));
  // const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const settings = {label: 'Settings', icon: IconSettings}

  useEffect(() => {
    setMockData(prevMockData => {
      return prevMockData.map((val, ind) => {
        if (openedLink === val.label) {
          return {
            ...val,
            initiallyOpened: !val.initiallyOpened,
          };
        } else {
          return {
            ...val,
            initiallyOpened: false
          };
        }
      });
    });
    // setOpenedLink()
    console.log("opened is **********", opened)
  }, [openedLink]);

  
  
  

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