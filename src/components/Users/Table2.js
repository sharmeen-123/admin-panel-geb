import { useState, useContext } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import axios from '../../axios';
import { AuthContext } from "../../App";
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

let RowData = {
  name: '',
  email: '',
  company: '',
};
function Popup(props) {
    return (
      <div className="popup">
        <div className="popup-inner">{props.children}</div>
      </div>
    );
  }
  
function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }) {
    console.log("data of table...", data)
    
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
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
  const { update, setUpdate } = useContext(AuthContext);
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
  function togglePopup2() {
    setShowPopup2(!showPopup2);
  }

  const viewUser = (user) => {
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setDesignation(user.userType);
    if(user.image){
    setImage(user.image);}
    if (address) {
      setAddress(user.address)
    } else {
      setAddress("Null")
    }
  }

  const deleteUser = async () => {
    console.log("in delete User", id)
    if (id) {
      let res = await axios.delete('/user/deleteUser/' + id)
        .then((res) => {
          // setusers(res.data.data);
          console.log("deleted")
        //   Users()
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

  }

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData?.map((row) => (
    <tr key={row.name}>
      <td>{row.firstname+" "+row.lastName}</td>
      <td>{row.email}</td>
      

    </tr>
  ));

   // switching verification
   const verification = async (id) => {
    console.log("in verification", id)
    let res = await axios.put('/user/verifyUser/' + id)
      .then((res) => {
        // setusers(res.data.data);
        console.log("updatedd")
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching status
  const status = async (id) => {
    console.log("in status", id)
    let res = await axios.put('/user/switchUserStatus/' + id)
      .then((res) => {
        // setusers(res.data.data);
        console.log("updatedd")
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem"/>}

        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'firstName lastName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Verified
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Action
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows?.length > 0 ? (
            rows
          ) : (
            <>
            {data?.map((val, ind)=>{
                return(
                <tr>
                    <td>{val.firstName+" "+val.lastName}
                    </td>
                    <td>{val.email}</td>
                    <td>
                      {val.status === "block" ? (<>
                        <select onChange={e => status(val._id)}>
    
                          <option value="block">block</option>
    
                          <option value="unblock">unblock</option>
    
                        </select></>) : (<>
                          <select onChange={e => status(val._id)}>
    
                            <option value="unblock">unblock</option>
    
                            <option value="block">block</option>
    
                          </select></>)}
                    </td>
                    <td>
                      {val.verified === true ? (<>
                        <select onChange={e => verification(val._id)}>
    
                          <option value="verify">verify</option>
    
                          <option value="disprove">disprove</option>
    
                        </select></>) : (<>
                          <select onChange={e => verification(val._id)}>
                            <option value="disprove">disprove</option>
                            <option value="verify">verify</option>
                          </select></>)}
    
                    </td>
                    <td>
                      <div className="button-container" onClick={() => viewUser(val)}>
                        <img
                          src={require("../../imgs/view.png")}
                          className="icon"
                          onClick={togglePopup2}
                        />
    
                        {showPopup2 && (
                          <Popup className="viewpopup">
                            <img src={image} className="dp" />
                            <h1>{name}</h1>
                            <div className="popdiv">
                              <div className="smallpopdiv">
                                <div className="smalldiv">
                                  <label className="poplabel">Email:</label>
                                  <br />
                                  <p>{email}</p>
                                </div>
                                <div className="smalldiv">
                                  <label className="poplabel">Contact:</label>
                                  <br />
                                  <p>{phone}</p>
                                </div>
                              </div>
    
                              <div className="smallpopdiv">
                                <div className="smalldiv">
                                  <label className="poplabel">Designation:</label>
                                  <br />
                                  <p>{designation}</p>
                                </div>
                                <div className="smalldiv">
                                  <label className="poplabel">Address:</label>
                                  <br />
                                  <p>{address}</p>
    
                                </div>
                              </div>
                            </div>
    
                            <div style={{ textAlign: "center" }}>
                              <button onClick={togglePopup2}>Okay</button>
                            </div>
                          </Popup>
                        )}
    
                        <NavLink
                          to="/updateUser">
                          <img
                            src={require("../../imgs/pencil.png")}
                            onClick={() => setUpdate(val)}
                          //   className="icon"
                          />
                        </NavLink>
                        <img
                          src={require("../../imgs/disposal.png")}
                          className="icon"
                          onClick={() => togglePopup(val)}
                        />
                        {showPopup && (
                          <Popup>
                            <h1>Delete User</h1>
                            <p>You want to Delete User.</p>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              <button onClick={() => { togglePopup(false, true); }}>Yes</button>
                              <button className="red" onClick={() => togglePopup(false, false)}>
                                No
                              </button>
                            </div>
                          </Popup>
                        )}
                      </div>
                    </td>
                </tr>)
              })}
              </>
          )}
         
        </tbody>
      </Table>
    </ScrollArea>
  );
}