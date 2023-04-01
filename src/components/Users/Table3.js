import { useState, useEffect, useContext } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Button,  Paper, Modal, TextInput } from '@mantine/core';
import { IconPhoneCall, IconAt, IconMapPin } from '@tabler/icons-react';
import { AuthContext } from "../../App";
import { NavLink } from "react-router-dom";
import axios from '../../axios';
import "./tableStyle.css"
import { useDisclosure } from '@mantine/hooks';
import { Menu, useMantineTheme } from '@mantine/core';
import Close from "../../imgs/close.png"
import {
  IconSquareCheck,
  IconPackage,
  IconUsers,
  IconCalendar,
  IconChevronDown,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
  
    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },


}));
function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}


export function TableSelection({ dataa }) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [id, setId] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false);
  const [designation, setDesignation] = useState(false);
  const [address, setAddress] = useState(false);
  const [image, setImage] = useState(require("../../imgs/upload.png"))
  const [users, setusers] = useState(false);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState(dataa)
  const { update, setUpdate } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);

  function togglePopup(user, del) {
    setShowPopup(!showPopup);
    if (user) {
      setId(user._id)
    } else if (del === true) {
      deleteUser()
    } else {
      setId(false)
    }
  }
  function togglePopup2(item) {
    viewUser(item)
    setShowPopup2(!showPopup2);
    open()
  }

  const viewUser = (user) => {
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setDesignation(user.userType);
    if (user.image) {
      setImage(user.image);
    }
    if (address) {
      setAddress(user.address)
    } else {
      setAddress("Null")
    }
  }
  // getting users info
  const Users = async () => {
    let res = await axios.get('/user/getAllUsers')
      .then((res) => {
        setData(res.data.data);
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching verification
  const verification = async (id) => {
    let res = await axios.put('/user/verifyUser/' + id)
      .then((res) => {
        Users()
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching status
  const status = async (e, id) => {
    let res = await axios.put('/user/switchUserStatus/' + id)
      .then((res) => {
        Users()
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // deleting User
  const deleteUser = async () => {
    if (id) {
      let res = await axios.delete('/user/deleteUser/' + id)
        .then((res) => {
          Users()
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    Search()
  }

  // searching user
  const Search = async () => {
    let res = await axios.get('/user/getUserByName/' + search)
      .then((res) => {
        setData(res.data.data);
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  const sortBlock = () => {
    // Users()
    const filteredData = data.filter(item => item.status.toString() === "block");
    setData(filteredData)

  }
  const sortVerified = () => {
    // Users()
    const filteredData = data.filter(item => item.verified === false);
    setData(filteredData)

  }

  useEffect(() => {
    Users();
  }, [])

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current?.length === data?.length ? [] : data.map((item) => item.id)));

  const rows = data?.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.image} radius={26} />
            <Text size="sm" weight={500}>
              {item.firstName + " " + item.lastName}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.dateJoined}</td>
        <td>
          {item.status === "block" ? (<>
            <select onChange={e => status(e, item._id)} selected="block" value={"block"} className="block">

              <option value="block" className='block'>block</option>

              <option value="unblock" className='unblock'>unblock</option>

            </select></>) : (<>
              <select onChange={e => status(e, item._id)} selected="unblock" value={"unblock"} className="unblock">

                <option value="unblock" className='unblock'>unblock</option>

                <option value="block" className='block'>block</option>

              </select></>)}
        </td>
        <td>
          {item.verified === true ? (<>
            <select onChange={e => verification(item._id)} className="unblock">

              <option value="verify" className='unblock'>verify</option>

              <option value="disprove" className='block'>disprove</option>

            </select></>) : (<>
              <select onChange={e => verification(item._id)} className={"block"}>
                <option value="disprove" className='block'>disprove</option>
                <option value="verify" className='unblock'>verify</option>
              </select></>)}

        </td>
        <td>
          <div className="button-container" >
            <div
              onClick={() => togglePopup2(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
              </svg>
            </div>
            {/* <img
                          src={require("../../imgs/view.png")}
                          className="icon"
                          onClick={togglePopup2}
                        /> */}


 {/* ..........Popup....... */}
 {showPopup2 && (
              <Popup >
               
                <Paper style={{width:"30vw"}}>

                <div>
                <Group position='apart' style={{padding:"2.5%"}}>
                      <Text>
                        User Info
                      </Text>
                      <img src={Close} onClick={() => setShowPopup2(!showPopup2)} style={{width:"15px"}}/>
                    </Group>
      <Group noWrap style={{padding:"10%"}}>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {designation}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {phone}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt={5}>
            <IconMapPin stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {address}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
              
                            
                    </Paper>
                    </Popup>
            )}
            <NavLink
              to="/updateUser">
              <div
                onClick={() => setUpdate(item)}
                style={{ margin: "0", padding: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              </div>
              {/* <img
                            src={require("../../imgs/pencil.png")}
                            onClick={() => setUpdate(item)}
                          //   className="icon"
                          /> */}
            </NavLink>
            <div

              onClick={() => togglePopup(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </div>

            {showPopup && (
              <Popup>
               
                <Paper style={{ width: "22vw", padding:"4%" }}>
                <Group position='apart'>
                      <Text>
                        Delete User
                      </Text>
                      <img src={Close} onClick={() => setShowPopup(!showPopup)} style={{width:"15px"}}/>
                    </Group>
                        
                        <Text ta="center" fz="lg" weight={500} mt="md">
                            Delete User
                        </Text>
                        <p>You want to Delete User!</p>
                        <Button onClick={() => { togglePopup(false, true); }} variant="default" fullWidth mt="md">Yes</Button>
                          <Button  onClick={() => togglePopup(false, false)} variant="default" fullWidth mt="md">
                            No
                          </Button>
                        
                        
                    </Paper>
              </Popup>
            )}
          </div>
        </td>
      </tr>
    );
  });
  const theme = useMantineTheme();

  return (
    <ScrollArea>
      <Group position='apart'>
      <TextInput label={"Search User"} style={{marginBottom:"2%", width:"85%"}} placeholder={"Search by name"}
      onChange={e=> handleSearch(e)}/>
       <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
      
    >
      <Menu.Target>
        <Button rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />} pr={12} onClick={()=> Users()} className='button'>
          Sort
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        
        <Menu.Item
          icon={<IconSquareCheck size="1rem" color={theme.colors.pink[6]} stroke={1.5} />}
          onClick={sortVerified}
        >
          Sort by Verified
        </Menu.Item>
        <Menu.Item
          icon={<IconUsers size="1rem" color={theme.colors.cyan[6]} stroke={1.5} />}
          onClick={sortBlock}
        >
          Sort by Status
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
    </Group>
    <div style={{backgroundColor:"white", border:"2px solid rgb(226, 225, 225)",boxShadow:"0px 0px 3px 3px rgb(226, 225, 225)", borderRadius:"15px", padding:"3%"}}>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>Status</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      </div>
    </ScrollArea>
  );
}
