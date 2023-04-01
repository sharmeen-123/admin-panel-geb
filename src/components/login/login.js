import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
    Alert
  } from '@mantine/core';
  import React, {useState, useContext} from 'react';
  import { NavLink } from 'react-router-dom';
  import { AuthContext } from "../../App";
  import { IconAlertCircle } from '@tabler/icons-react';
  import Logo from '../../imgs/logo.png'
  import axios from '../../axios';
  import { useNavigate } from 'react-router-dom';
  import Bg from '../../imgs/backgroundImage.jpg'
  import "./login.css"
  // import {ReactComponent as ReactLogo} from '../../imgs/bg.svg'
  
  // const useStyles = createStyles((theme) => ({
  //   wrapper: {
  //     // minHeight: rem(610),
  //     // backgroundSize: 'cover',
  //     // backgroundImage:
  //     //   `url(${Bg})`,
  //     backgroundColor:"white"
  //   },
  
  //   form: {
  //     borderRight: `${rem(1)} solid ${
  //       theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
  //     }`,
  //     // minHeight: rem(610),
  //     maxWidth: rem(490),
  //     paddingTop: rem(80),
  
  //     [theme.fn.smallerThan('sm')]: {
  //       maxWidth: '100%',
  //     },
  //   },
  //   login:{
  //       backgroundColor:"green",
  //       '&:hover': {
  //           backgroundColor: '#4F7942 !important',
  //         },
  //   },
  
  //   title: {
  //     color: theme.colorScheme === 'dark' ? theme.white : 'green',
  //     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  //   },

  const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');
  
    return {
      wrapper: {
        display: 'flex',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        borderRadius: theme.radius.lg,
        // padding: rem(4),
        justifyContent:'center',
        alignItems:'center',
        // margin:"3vw",
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
          }`,
  
  
        [BREAKPOINT]: {
          flexDirection: 'column',
        },
  
  
      },
      login:{
              backgroundColor:"green",
              '&:hover': {
                  backgroundColor: '#4F7942 !important',
                },
          },
        
          title: {
            color: theme.colorScheme === 'dark' ? theme.white : 'green',
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          },
  
      form: {
        boxSizing: 'border-box',
        flex: 1,
        // padding: theme.spacing.xl,
        // paddingLeft: `calc(${theme.spacing.xl} * 2)`,
        // borderLeft: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        // border: "2px solid rgb(226, 225, 225)",
  
        [BREAKPOINT]: {
          padding: theme.spacing.md,
          paddingLeft: theme.spacing.md,
        },
      },
      contacts:{
        boxSizing: 'border-box',
        flex:1,
        // width:'60%',
        // padding: theme.spacing.xl,
        // paddingLeft: `calc(${theme.spacing.xl} * 2)`,
        margin:'0 auto',
        textAlign:'center',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  
        [BREAKPOINT]: {
          padding: theme.spacing.md,
          paddingLeft: theme.spacing.md,
        },
      }
     
    };
  });
  
  export function AuthenticationImage() {
    const { classes } = useStyles();
    const {alrt, setAlrt} = useContext(AuthContext);
    const {msg, setMsg} = useContext(AuthContext);
    const {login, setLogin} = useContext(AuthContext);
    const{activeUser, setActiveUser} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

     // adding user in db
     const handleChange = async () => {
        let res = await axios.post('/user/login', {
          email: email,
          password: pass, 
          job: "admin"
        })
          .then((res) => {
    
            setActiveUser(res.data.data);
            setLogin(true)
            setMsg("Your Account Has Been Created")
            navigate('/dashboard');
          })
          .catch((error) => {
            if(error.response.data){
            setMsg(error.response.data)}
            else{
              setMsg("Some Error Occured")
            }
            setErr(true)
          })
        
      }
    

    return (
      <div className={classes.wrapper}>
        
        <Paper className={classes.form} radius={0} p={30}>
        {alrt?(<>
          <Alert icon={<IconAlertCircle size="1rem" />} withCloseButton closeButtonLabel="Close alert" 
          onClose={()=> setAlrt(false)}
          title="Message" color="green" style={{top:0, }}>
       {msg}
      </Alert>
        </>):(<></>)}
          <h1 style={{color:'green', textAlign:"center"}}>Login</h1>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to GEB
          </Title>
  
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" onChange={(e) => setEmail(e.target.value)}/>
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" onChange={(e) => setPass(e.target.value)}/>
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          {err?(<>
          <Text style={{color:"red"}}>
            {msg}
          </Text>
          </>):(<></>)}
          <Button fullWidth mt="xl" size="md" className={classes.login} onClick={handleChange} >
            Login
          </Button>
  
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <NavLink to={'/signup'} style={{color:'green'}}>
            <Anchor weight={700} 
            style={{color:'green'}}>
              Register
            </Anchor>
            </NavLink>
          </Text>
        </Paper>
        <div className={classes.contacts}>
              <img src={Logo} style={{}} />
            </div>
      </div>
    );
  }