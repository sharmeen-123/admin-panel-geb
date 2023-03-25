import React, { useState, useEffect, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import axios2 from '../../axios';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Avatar, Text, Paper } from '@mantine/core';
import { AuthContext } from "../../App";
import { NavLink } from 'react-router-dom';
import circle from "../../imgs/circle.png"
import { HeaderTabs } from '../header/header';
import Loading from '../Loader/loading';



const Maps = () => {
    const [lng, setLng] = useState(73.0663);
    const [lat, setLat] = useState(33.7294);
    const [opened, { open, close }] = useDisclosure(false);
    const { shift, setShift } = useContext(AuthContext);
    const [address, setAddress] = useState()
    const [shifts, setShifts] = useState();
    const { location, setLocation } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const [userStatus, setUserStatus] = useState()

    let allAreas = [];
    const allShifts = async () => {
        try {
            const res = await axios2.get('/shifts/getActiveShifts');
            setShifts(res.data.data);
            console.log("all active shifts**********",res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getUserStatus = async () => {
        try {
            const res = await axios2.get('/user/getUserStatus');
            setUserStatus(res.data.data);
            console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
    };
    const getUser = async (id) => {
        try {
            const res = await axios2.get('/user/getOneUser/' + id);
            setUser(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const getAddress = async (latitude, longitude) => {
        try {

            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const addresss = response.data.display_name;
            if (location) {
                allAreas = location;
            }

            allAreas.push(addresss)
            setLocation(allAreas)
            // const response2 = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            // const address2 = response.data.display_name;
            console.log("promiseee", address)
            setAddress(addresss)

            // setCheckinAddress(address2)
            //   return(address);
        } catch (error) {
            console.error(error);
        }
    };


    const popup = (val) => {
        setShift(val)
        getUser(val.userID)

        let loc = shift.locations
        console.log("shift.location", loc)
        loc.map((val, ind) => {
            getAddress(val.latitude, val.longitude)
            console.log("in get address...", address)
            console.log(val.latitude, ".....", val.longitude)
            // allAreas.push(address)
        })
        // let pushLast = location;
        // pushLast.pop()
        // setLocation(pushLast)
        getAddress(shift.lastLocation.latitude, shift.lastLocation.longitude)
        // allAreas.push(address)
        console.log(shift.lastLocation.latitude, "*************", shift.lastLocation.longitude)
        // setLocation(allAreas)
        console.log("all Areas............", location, "............", allAreas)
        open()
    }

    useEffect(() => {
        allShifts();
        getUserStatus();
    }, []);

    return (
        <div>

<HeaderTabs user={{ name: "sharmeen", image: "sdsd" }} title={"Track Employees"} />

            {shifts&&userStatus?(<>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "2vw",  backgroundColor: "#f5f6fa",  borderRadius:'3%',  margin: '1.3%'}}>
            
                <div style={{margin:"1.5%"}}>
                    <Map
                        mapboxAccessToken='pk.eyJ1Ijoic2hhcm1lZW4tZmF0aW1hIiwiYSI6ImNsZmRzeXF3bDB4b2UzeXBnMm96bHp3cjEifQ.nFCG0mw5jotR970K1RZYRQ'
                        style={{
                            width: "50vw",
                            height: "35vw",
                            borderRadius: "15px",
                            border: "2px solid rgb(226, 225, 225)",

                        }}
                        initialViewState={{
                            longitude: lng,
                            latitude: lat,
                            zoom: 10,
                        }}
                        mapStyle='mapbox://styles/mapbox/outdoors-v9'
                    >
                        {/* <Marker
                        // key={6}
                        latitude={33.6518}
                        longitude={73.1566}
                    /> */}

                        {shifts?.map((val, ind) => {
                            return (
                                <Marker
                                    key={ind}
                                    longitude={val.lastLocation.longitude}
                                    latitude={val.lastLocation.latitude}
                                    onClick={() => popup(val)}
                                />

                            );
                        })}


                        <NavigationControl position='bottom-right' />
                        <FullscreenControl />
                        <GeolocateControl />

                    </Map>
                </div>
                <div style={{margin:"1.5%"}}>
                    <div className="card" style={{ marginLeft: "1vw", height:"90%" }}>

                        <div style={{ overflow: "auto" }}>
                            <h1 className="numbers" style={{marginRight:"1vw", marginBottom: "3vw", borderBottom: "2px solid rgb(226, 225, 225)", textAlign: "center" }}>All Workers</h1>
                            <div >
                                {userStatus?.map((val, ind) => {
                                    return (
                                        <div style={{ display: "flex", margin: "1vw", width: "92%", borderBottom: "2px solid rgb(226, 225, 225)" }}>
                                            {val.image ? (<>
                                                <img src={val.image} style={{ width: "1.7vw",height:"6vh", borderRadius: "100%" }} />
                                            </>) : (<>
                                                <img src={require("../../imgs/upload.png")} style={{ width: "3vw", borderRadius: "100%" }} />
                                            </>)}
                                            {val.active ? (<>
                                                <img src="https://www.nicepng.com/png/full/244-2444375_rhodes-online-green-dot-icon.png" style={{ width: ".5vw", height: "1.5vh", marginTop: "1.2vw", marginLeft: "1vw" }} />
                                            </>) : (<>
                                                <img src={circle} style={{ width: ".5vw", height: "1.5vh", marginTop: "0.7vw", marginTop: "1.2vw", marginLeft: "1vw", display: "flex" }} />
                                            </>)}
                                            <p style={{ textAlign: "center", marginLeft: "1vw" }}>{val.name}</p>

                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div></>):(<>
            <Loading/>
            </>)}
                
            {/* ..........Popup....... */}
            <Modal opened={opened} onClose={close} title="User Info"
                radius="md"
                withBorder
                centered
                p="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    
                })}

            >
                {user ? (<>
                    <Paper>
                        <Avatar src={user.image} size={120} radius={120} mx="auto" />
                        <Text ta="center" fz="lg" weight={500} mt="md">
                            {user.firstName + ' ' + user.lastName}
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            {user.email} • {user.userType}
                        </Text>
                        <div style={{ marginLeft: "2vw",marginTop:"1vw", display: "flex" }} >

                            <div style={{ marginLeft: "0.5vw", marginRight: "0.5vw", marginTop: "0.7vw" }}>
                                <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12.0311C22 17.5078 15.2969 27.258 12.3578 31.281C11.6531 32.2397 10.3469 32.2397 9.64219 31.281C6.70313 27.258 0 17.5078 0 12.0311C0 5.38895 4.92708 0 11 0C17.0729 0 22 5.38895 22 12.0311Z" fill="#000000" />
                                </svg>
                            </div>

                            <Text c="dimmed" fz="sm">
                            {address}
                        </Text>
                        </div>
                        <NavLink to={"/userInfo"}>

                            <Button variant="default" fullWidth mt="md">
                                View Details
                            </Button>
                        </NavLink>
                    </Paper>

                </>) : (<>
                <Loading/>
                </>)}


            </Modal>

        </div>

    );
};

export default Maps;

