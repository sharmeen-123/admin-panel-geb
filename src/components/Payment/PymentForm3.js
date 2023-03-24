import {
    Paper,
    Text,
    NumberInput,
    Textarea,
    Button,
    Group,
    SimpleGrid,
    createStyles,
    rem,
    PasswordInput,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileInput, Avatar, Modal } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useDisclosure } from '@mantine/hooks';
import { HeaderTabs } from './header/header';
import { forwardRef } from 'react';

import "./PaymentForm.css";
// import { ContactIconsList } from '../ContactIcons/ContactIcons';
// import bg from './bg.svg';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        wrapper: {
            display: 'flex',
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
            marginLeft:"7%",
            marginRight:"7%"
            // border:"2px solid red"
        },

        form: {
            boxSizing: 'border-box',
            flex: 1,
            padding: theme.spacing.xl,
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
            // backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: `${rem(1)} solid transparent`,
            padding: theme.spacing.xl,
            flex: `0 0 ${rem(280)}`,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.sm,
                paddingLeft: theme.spacing.md,
            },
        },

        title: {
            marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.xl,
            },
        },

        control: {
            [BREAKPOINT]: {
                flex: 1,
            },
        },
    };
});

const SelectItem = forwardRef(({ image, label, email, value, ...others }, ref) => (
    <div key={email} data-value={value} {...others}>
        <Group noWrap>
            <Avatar src={image} />

            <div>
                <Text size="sm">{label}</Text>
                <Text size="xs" opacity={0.65}>
                    {email}
                </Text>
            </div>
        </Group>
    </div>
));

export function PaymentForm({ update }) {
    const { classes } = useStyles();
    const [msg, setMsg] = useState("User Not Selected");
    const [opened, { open, close }] = useDisclosure(false);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [name, setName] = useState(false);
    const [wage, setWage] = useState(0);
    const [hours, setHours] = useState(0);
    const [payment, setPayment] = useState(0);
    const [shifts, setShifts] = useState(0);
    const [id, setId] = useState(false);
    const [email, setEmail] = useState(false);
    const [image, setImage] = useState();
    const [userr, setUserr] = useState([])

    

    const handleValueChange = (value) => {
        console.log("in value changeee")
        setSelectedValue(value);
        handleUserInfo(userr, value)
        totalHours(selectedValue)
    };
    const Users = async () => {
        console.log("update in userr....****", update)
        try {
            const res = await axios.get('/user/getAllUsers');
            const users = res.data.data;
            setUserr(users)
            console.log('users', users);
            const newData = users?.map((val) => ({
                label: `${val.firstName} ${val.lastName}`,
                email: val.email,
                value: val._id,
                image: val.image,
            }));
            if (update !== false) {
                let updatedVal;
                if (update.userImage) {
                    updatedVal = {
                        label: update.userName,
                        email: update.email,
                        value: update.userID,
                        image: update.userImage
                    }
                } else {
                    updatedVal = {
                        label: update.userName,
                        email: update.email,
                        value: update.userID
                    }
                }
                console.log("*****************", updatedVal)
                newData.unshift(updatedVal)
            }
            setData(newData);
            console.log('data...', data);
            if (newData.length) {
                setSelectedValue(newData[0].value);
            }
            //  handleUserInfo(users, selectedValue)
            //   totalHours(selectedValue)
        } catch (error) {
            console.log(error);
        }
    };

    const payAmount = async () => {
        console.log(name)
        if (name) {
            let res = await axios.post('/payment/addpayment', { userName: name, userID: id, wage: wage, paidAmount: payment, totalHours: hours, shifts: shifts, userEmail: email, userImage: image })
                .then((res) => {
                    // setHours(res.data.data);
                    console.log("hourss", res.data.data)
                    setMsg("Amount Paid Successfully!")
                    setImage()
                }

                )
                .catch((error) => {
                    // setError(error.response.data);
                    console.log(error.response.data);
                    setMsg(error.response.data)
                })
        }
        open()
    }

    const updateAmount = async () => {
        console.log(name)
        if (name) {
            let res = await axios.put('/payment/updatePayment/' + update._id, { userID: id, userName: name, wage: wage, paidAmount: payment, totalHours: hours, shifts: shifts, userEmail: email, userImage: image })
                .then((res) => {
                    setMsg("Payment Updated")
                    setImage()
                }

                )
                .catch((error) => {
                    setMsg(error.response.data)
                    console.log(res.data);
                })
        }
        open()
    }



    const handleUserInfo = (users, selectedValue) => {
        console.log("in user Infoo")
        console.log("all userss", users, selectedValue)
        const user = users.find(person => person._id === selectedValue);
        //   return person ? person.age : null;
        // };
        let nameee = user.firstName + " " + user.lastName
        setName(nameee);
        console.log("name...", user.firstName + " " + user.lastName)
        setId(user._id)
        console.log("id....", id)
        if (user.image) {
            setImage(user.image)
        }
        console.log("image...", image)
        setEmail(user.email)
        console.log("email...", email)
        console.log("propss...", update)
    }


    // getting total hours of a uset
    const totalHours = async (id) => {
        console.log("id.....", id)
        if (id) {
            let res = await axios.get('/shifts/getNumberOfHours/' + id)
                .then((res) => {
                    setShifts(res.data.data.shifts)
                    setHours(res.data.data.totalHours)
                    let data = { totalHours: res.data.data.totalHours }
                    update = data
                    console.log("update...", update)
                    console.log("hourss", res.data.data)
                }

                )
                .catch((error) => {
                    // setError(error.response.data);
                    console.log(error);
                })
        }
    }
    useEffect(() => {
        const totalPayment = wage * hours;
        setPayment(totalPayment);
    }, [wage, hours]);


    useEffect(() => {
        Users();
        if (update) {
            setPayment(update.totalPayment)
            setHours(update.totalHours)
            setWage(update.wage)
            setName(update.userName);
            setId(update.userID)
            if (update.userImage) {
                setImage(update.userImage)
            }
            setEmail(update.userEmail)
        }

    }, [])

    const form = useForm({

        initialValues: {
            wage: wage,
            hours: hours,
            totalPayment: payment,
            user: "",
        },

    });
    const handleWageChange = (value) => {
        setWage(value);
        setPayment(wage * hours);
    };

    const handleHoursChange = (event) => {
        setHours(event)
        setPayment(wage * hours);

        console.log("hours....", hours)
    };

    const handleForm = (user) => {
        if (!update) {
            payAmount()
        } else {
            updateAmount()
        }
        console.log("amount paid........")
    }



    return (

        <div>
            <HeaderTabs user={{ name: "sharmeen", image: "sdsd" }} title={"Add Payment"} />
            <Paper shadow="md" radius="lg" className={classes.main}>
                <div className={classes.wrapper}>


                    <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
                        <Text fz="lg" fw={700} className={classes.title}>
                            Add Payment
                        </Text>
                        <Select
                            label="Choose employee of the month"
                            placeholder="Pick one"
                            itemComponent={SelectItem}
                            data={data}
                            searchable
                            maxDropdownHeight={400}
                            nothingFound="Nobody here"
                            value={selectedValue}
                            onChange={(event) => handleValueChange(event)}
                            filter={(value, item) =>
                                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                                item.email.toLowerCase().includes(value.toLowerCase().trim())
                            }
                            // {...form.getInputProps('user')} 
                            required

                        />

                        <div className={classes.fields} style={{ marginTop: "2vh" }}>

                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <NumberInput
                                    label="Hours"
                                    id="hours"
                                    value={hours}
                                    onChange={(event) => handleHoursChange(event)}

                                />
                                <NumberInput
                                    label="Wage"
                                    id="wage"
                                    value={wage}
                                    onChange={(event) => handleWageChange(event)}

                                />
                            </SimpleGrid>

                            <NumberInput
                                label="Payment"
                                id="payment"
                                value={payment}
                                required
                            />

                            <Group position="right" mt="md">
                                <Button type="submit" className={classes.control} fullWidth>
                                    Pay
                                </Button>
                            </Group>
                        </div>
                    </form>
                </div>

                <Modal opened={opened} onClose={close} title="Warning"
                    radius="md"
                    p="sm"
                    withBorder
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    })}
                    centered

                >

                    <Text ta="center" fz="lg" weight={500} mt="md" pt={"3vw"} pb={"5vw"}>
                        {msg}
                    </Text>


                </Modal>
            </Paper>
        </div>
    );
}