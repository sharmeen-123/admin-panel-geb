import { useState, useEffect, useContext } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Button, Paper, Modal, TextInput } from '@mantine/core';
import axios from "../../axios";
import { NavLink } from "react-router-dom";
// import "./PaymentTable.css"
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import "./PaymentTable.css"
import Close from "../../imgs/close.png"
import {  Card} from '@mantine/core';
import BackGround from '../../imgs/backgroundImage.jpg'

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding:0,
    margin:0,
  },

  avatar: {
    border: `${rem(.1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
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
  const [data, setData] = useState(dataa)
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [users, setusers] = useState();
  const [name, setName] = useState(false);
  const [wage, setWage] = useState(0);
  const [payment, setPayment] = useState(0);
  const [hours, setHours] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [image, setImage] = useState(require("../../imgs/upload.png"));
  const [search, setSearch] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const { update, setUpdate } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);



  // api to get all payments
  const payAmount = async () => {
    let res = await axios.get('/payment/getAllPayments')
      .then((res) => {
        setusers(res.data.data);
        setData(res.data.data)
        console.log("hourss", res.data.data)
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  const updatePayment = (user) => {
    setUpdate(user)
  }

  const setView = obj => {
    setName(obj.userName);
    if (obj.userImage) {
      setImage(obj.userImage);
    }
    setPayment(obj.paidAmount);
    setHours(obj.totalHours);
    setShifts(obj.shifts);
    setWage(obj.wage);
  }
  const searchName = (e) => {
    setSearch(e.target.value);
    console.log(search)
    Search()
  }
  const Search = async () => {
    let res = await axios.get('/payment/getPaymentByName/' + search)
      .then((res) => {
        setusers(res.data.data);
        setData(res.data.data)
        console.log("users", res.data.data)
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }
  // deleting User
  const deletePayment = async () => {
    console.log("in delete User", deleteId)
    if (deleteId) {
      let res = await axios.delete('/payment/deletePayment/' + deleteId)
        .then((res) => {
          // setusers(res.data.data);
          console.log("deleted")
          payAmount()
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

  }
  function togglePopup(user, del) {
    setShowPopup(!showPopup);
    if (user) {
      setDeleteId(user._id)
    } else if (del === true) {
      deletePayment()
    } else {
      setDeleteId(false)
    }
  }
  function togglePopup2(obj) {
    setView(obj)
    setShowPopup2(!showPopup2);
    open()
  }

  useEffect(() => {
    payAmount();
  }, [])

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current?.length === data?.length ? [] : data?.map((item) => item.id)));
    // const { classes, theme } = useStyles()
  const rows = data?.map((item) => {
    const selected = selection.includes(item.id);

    const stats =[
      {label:"wage", value:wage},
      {label:"hours", value:hours},
      {label:"payment", value:payment},
      {label:"shifts", value:shifts},
    ]

   
    const items = stats.map((stat) => (
      <div key={stat.label}>
        <Text ta="center" fz="lg" fw={500}>
          {stat.value}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {stat.label}
        </Text>
      </div>
    ));
    return (

      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })} style={{ textAlign: "center" }}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.userImage} radius={26} />
            <Text size="sm" weight={500}>
              {item.userName}
            </Text>
          </Group>
        </td>
        <td>{item.userEmail}</td>
        <td>{item.shifts}</td>
        <td>{item.totalHours}</td>
        <td>{item.wage}</td>
        <td>{item.paidAmount}</td>
        <td>
          <div className="button-container">

            <div
              onClick={() => togglePopup2(item)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
              </svg>
            </div>

            {/* ..........Popup....... */}

            {showPopup2 && (

<Popup>

<Card withBorder padding="xl" radius="md" className={classes.card} style={{ width: "30vw" }}>
<Group position='apart' style={{marginBottom:"10px"}}>
                      <Text>
                        Payment Info
                      </Text>
                      <img src={Close} onClick={() => setShowPopup2(!showPopup2)} style={{width:"15px"}}/>
                    </Group>
      <Card.Section sx={{ backgroundImage: `url(${BackGround})`, height: 140 }} />
      <Avatar src={image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {name}
      </Text>
      {/* <Text ta="center" fz="sm" c="dimmed">
        {wage}
      </Text> */}
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      {/* <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Follow
      </Button> */}
    </Card>

                  {/* <Paper style={{ width: "30vw" }}>
                    <Group position='apart'>
                      <Text>
                        Payment Info
                      </Text>
                      <img src={Close} onClick={() => setShowPopup2(!showPopup2)} style={{width:"15px"}}/>
                    </Group>

                    <Avatar src={image} size={120} radius={120} mx="auto" />
                    <Text ta="center" fz="lg" weight={500} mt="md">
                      {name}
                    </Text>
                    <Group position='apart' style={{ margin: "1vw" }}>
                      <Text ta="center" c="dimmed" fz="sm">
                        Wage per Hour:{" " + wage}
                      </Text>
                      <Text ta="center" c="dimmed" fz="sm">
                        Total Hours:{" " + hours}
                      </Text>
                    </Group>
                    <Group position='apart' style={{ margin: "1vw" }}>
                      <Text ta="center" c="dimmed" fz="sm">
                        Total Payment:{" " + payment}
                      </Text>
                      <Text ta="center" c="dimmed" fz="sm">
                        Shifts:{" " + shifts}
                      </Text>
                    </Group>

                  </Paper> */}
                  </Popup>
            )}

            <NavLink
              to="/updatePaymentForm">
              <div
                onClick={() => setUpdate(item)}
                style={{ margin: "0", padding: 0 }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              </div>
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
                        Delete Payment
                      </Text>
                      <img src={Close} onClick={() => setShowPopup(!showPopup)} style={{width:"15px"}}/>
                    </Group>

                  <Text ta="center" fz="lg" weight={500} mt="md">
                    Delete Payment
                  </Text>
                  <p>You want to Delete payment!</p>
                  <Button onClick={() => { togglePopup(false, true); }} variant="default" fullWidth mt="md">Yes</Button>
                  <Button onClick={() => togglePopup(false, false)} variant="default" fullWidth mt="md">
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

  return (
    <div style={{padding:"2%", paddingBottom:0}}>
        <ScrollArea>
        <TextInput label={"Search Payment"} style={{ marginBottom: "2%" }} placeholder={"Search by name"}
          onChange={(event) => searchName(event)} />
           <div style={{backgroundColor:"white", border:"2px solid rgb(226, 225, 225)",boxShadow:"0px 0px 3px 3px rgb(226, 225, 225)", borderRadius:"15px", padding:"3%"}}>
    
        <Table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection?.length === data?.length}
                  indeterminate={selection?.length > 0 && selection?.length !== data?.length}
                  transitionDuration={0}
                />
              </th>
              <th className={classes.head}>User</th>
              <th>Email</th>
              <th>Shifts</th>
              <th>Hours</th>
              <th>Wage per Hour</th>
              <th>Total Payment</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        </div>
      </ScrollArea>
      
    </div>
  );
}
