import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
// import "./Adduser.css";
import Payment from "../../imgs/Payment.png";
import { HeaderTabs } from "../header/header";

export default function Adduser(props) {
  const [Name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("..");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Designation, setDesignation] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const {img, setImg} = useState(false)
  const [ImageSrc, setImageSrc] = useState(require("../../imgs/upload.png"));
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    console.log(ImageSrc)

    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset","player_image");
    //data.append("cloud_name","dyapmvalo");
    axios.post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
    .then((res) => {
      console.log(res.data.url)
      setImg(res.data.url)
    })
    .catch((err) => {
      console.log(err)
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }else {
      if(props.update){
        updateUser()
      }else{
      addUser()
      }
    }
    // TODO: submit form data
  };

  const Names = () => {
    let name = Name.split(" ");
      const checkName = (name) => {
        if (name !== ""){
          console.log("return")
          return true
        }
        else {
          return false;
        }
      }
      let namee = name.filter(checkName);
      setFname(namee[0])
      setLname(namee[1])
      console.log("fname ",fname, "lname",lname);
  }

    // adding user in db
    const addUser = async () => {
      Names()
      if(fname){
        let res = await axios.post('/user/register', {
          firstName: fname,
          lastName : lname,
          email : Email,
          phone : Contact,
          userType : Designation,
          image : img,
          status: "block",
          verified : true,
          password : Password 
        })
        .then ((res) => {
          
          console.log("users",res.data.data);
          setName("");
          setContact("");
          setEmail("");
          setDesignation("");
           setAddress("");
           setImageSrc(require("../../imgs/upload.png"));
           setPassword("");
           setConfirmPassword("");
        }
          
        )
        .catch((error) => {
            // setError(error.response.data);
            console.log(error);
        })
      }
      
    }

    // adding user in db
    const updateUser = async () => {
      Names()
      if(fname){
        let res = await axios.put('/user/updateUser/'+props.update._id, {
          name: Name,
          email : Email,
          phone : Contact,
          userType : Designation,
          image : img,
          address: Address,
          password : Password 
        })
        .then ((res) => {
          
          console.log("users",res.data.data);
          setName("");
          setContact("");
          setEmail("");
          setDesignation("");
           setAddress("");
           setImageSrc(require("../../imgs/upload.png"));
           setPassword("");
           setConfirmPassword("");
        }
          
        )
        .catch((error) => {
            // setError(error.response.data);
            console.log(error);
        })
      }
      
    }

  useEffect (()=>{
   Names();
   if(props.update){
    setName(props.update.firstName+" "+props.update.lastName);
    setContact(props.update.phone);
    setEmail(props.update.email);
    setDesignation(props.update.userType);
    if(props.update.address){
     setAddress(props.update.address)
    }
    if(props.update.image){
     setImageSrc(props.update.image);
     setImg(props.update.image)
    }
   }else{
    setName("");
    setContact("");
    setEmail("");
    setDesignation("");
     setAddress("");
    //  setImageSrc("");
     setPassword("");
     setConfirmPassword("");
   }
  
   
  },[])

  return (
    <div className="add_user_main">
      <HeaderTabs user={{name:"sharmeen", image:"sdsd"}} title={"Add User"}/>
      <form>
        <h1>Enter Users Details</h1>
        <div className="first_cont">
          <div>
            <label>Full Name</label> <br />
            
            <input
              type="text"
              placeholder="Enter User's Full Name"
              required
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Contact</label> <br />
            <input
              type="text"
              placeholder="Enter User's Mobile Number "
              required
              // pattern="^[(][0-9]{3}[)]\s[0-9]{3}-[0-9]{4}$"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Email</label> <br />
          <input
            className="email_input"
            type="email"
            placeholder="Enter User's Email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="first_cont">
          <div>
            <label>Designation</label> <br />
            <input
              type="text"
              placeholder="Enter User's Designation"
              required
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label> <br />
            <input
              type="text"
              placeholder="Enter User's Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="first_cont">
          <div>
            <label>Password</label> <br />
            <input
              type="password"
              placeholder="Enter User's Password"
              required
              value={Password}
              pattern="^(?=.*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9]).{8,}$"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password</label> <br />
            <input
              type="password"
              placeholder="Please Confirm Password"
              pattern="^(?=.*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9].*[A-Za-z0-9]).{8,}$"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="first_cont">
          <div className="img_container"
          onClick={handleClick}>
            <img src={ImageSrc} alt="Profile" className="image" />
            <input
              className="imggg"
              type="file"
              accept=".jpg, .jpeg, .png"
              placeholder="Choose picture"
              ref={hiddenFileInput}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <div className="button_cont">
            <button className="accept" type="submit" onClick={handleFormSubmit}>
              Add User
            </button>
            <button className="reject" type="reset">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
