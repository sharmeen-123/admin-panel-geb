import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  rem,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileInput, Avatar, Modal, Alert } from '@mantine/core';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import axios2 from '../../axios';
import { useDisclosure } from '@mantine/hooks';
import { HeaderTabs } from '../header/header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import { IconAlertCircle } from '@tabler/icons-react';
import man from "./../../imgs/man.png"
import Logo from "../../imgs/logo.png";
import './Signup.css'
import Bg from '../../imgs/backgroundImage.jpg'
import { NavLink } from 'react-router-dom';
// import { ContactIconsList } from '../ContactIcons/ContactIcons';
// import bg from './bg.svg';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      // margin:"3vw",
      border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,


      [BREAKPOINT]: {
        flexDirection: 'column',
      },


    },
    main: {
      margin: "1.5%",
      // border:"2px solid red"
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      // padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      // border: "2px solid rgb(226, 225, 225)",

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(-12),

    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg,
      textAlign: 'center',
      // border: `${rem(1)} solid transparent`,
      // padding: theme.spacing.xl,
      flex: `0 0 ${rem(490)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      justifyContent: 'center',
      textAlign: "center",
      color: 'green',

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      margin: "1%",
      width: "30%",
      backgroundColor: "green",
      '&:hover': {
        backgroundColor: '#4F7942 !important',
      },
    },
  };
});

export function Signup({ update }) {
  const { classes } = useStyles();
  const [img, setImg] = useState(update.image);
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { msg, setMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('');


  function handlePhoneChange(event) {
    const { value } = event.target;
    if (value.length <= 14) {
      setPhoneValue(value);
    }
  }

  const form = useForm({

    initialValues: {
      password: "",
      confirmPassword: '',
      address: update.address,
      phone: update.phone,
      fName: update.firstName,
      lName: update.lastName,
      designation: 'admin',
      email: update.email,
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },

  });

  // upload img on cloudinary
  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (event) {
      const data = new FormData();
      data.append("file", event);
      data.append("upload_preset", "player_image");
      axios.post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
        .then((res) => {
          setImg(res.data.url)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  // adding user in db
  const addUser = async (user) => {
    let res = await axios2.post('/user/register', {
      firstName: user.fName,
      lastName: user.lName,
      email: user.email,
      phone: phoneValue,
      userType: user.designation,
      address: user.address,
      image: img,
      status: "unblock",
      verified: true,
      password: user.password
    })
      .then((res) => {

        setMsg("Your Account Has Been Created")
        setAlrt(true)
        navigate('/');
      })
      .catch((error) => {
        if (error.response.data) {
          setMsg(error.response.data)
        }
        else {
          setMsg("Some Error Occured")
        }
        setIsError(true)
        open()
      })

  }



  const handleForm = (user) => {
    addUser(user)
  }

  useEffect(() => {
    setImg(man)
  }, [])


  return (
    <div>

      <Paper shadow="md" radius="lg" className={classes.main}>

        <div className={classes.wrapper}>


          <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
            {/* <img src={Logo} style={{width:"5rem"}}/> */}
            {isError ? (<>
              <Alert icon={<IconAlertCircle size="1rem" />} withCloseButton closeButtonLabel="Close alert"
                onClose={() => setIsError(false)}
                title="Error" color="red" style={{ top: 0, }}>
                {msg}
              </Alert>
            </>) : (<></>)}
            <h1 fz="md" fw={500} className={classes.title}>
              Signup
            </h1>

            <div className={classes.fields}>
              <div>
                <Avatar size={120} src={img} radius={"md"} style={{ margin: "0 auto" }} />
                <FileInput style={{ width: "20%", margin: "0 auto", padding: "1%" }} placeholder="Upload image" accept="image/png,image/jpeg" onChange={handleImageUpload} />
              </div>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput label="First Name" placeholder="Your first name" {...form.getInputProps('fName')} />
                <TextInput label="Last Name" placeholder="Your last name" {...form.getInputProps('lName')} />
              </SimpleGrid>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  label="Email"
                  placeholder="hello@gmail.dev"
                  pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                  required
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="Contact"
                  placeholder="(555) 555-5555"
                  pattern="^\(?([2-9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
                  required
                  value={phoneValue}
                  onChange={handlePhoneChange}
                />
              </SimpleGrid>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput label="Designation" disabled required {...form.getInputProps('designation')} />
                <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} style={{ marginBottom: 0 }} />
              </SimpleGrid>

              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  required
                  {...form.getInputProps('password')}
                />
                {/* <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} /> */}
                <PasswordInput
                  mt="sm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  required
                  {...form.getInputProps('confirmPassword')}
                />
              </SimpleGrid>




              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center"
              }}>

                {/* <NavLink to={"/mainUsers"}> */}
                <Button type="submit" className={classes.control}>
                  SignUp
                </Button>
                {/* </NavLink> */}
                <Group mt="md">
                  <Text>Already have an account</Text>
                  <NavLink to={'/'} style={{ color: 'green', fontWeight: "bold" }}>
                    <Text>Signin</Text>
                  </NavLink>
                </Group>
              </div>
            </div>
          </form>
          <div className={classes.contacts}>
            <img src={Logo} style={{width:"25vw"}}/>
          </div>
        </div>

      </Paper>

    </div>
  );
}