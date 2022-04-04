import React,{useState} from 'react';
//import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles.css";
const Login = ({setLoginUser}) => {
    const navigate = useNavigate();
    const [form,setForm] = useState({
        name:"",
        password: ""
    })

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    }
    /*
    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
        ...user,//spread operator 
        [name]:value
        })
    }
    
    const login =()=>{
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(res=>{alert(JSON.stringify(res)) //res.data.message
        //setLoginUser(res.data.user)
    navigate.push("/")})
    }
    */
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
        username: "user1",
        password: "pass1"
        },
        {
        username: "user2",
        password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    
    async function onSubmit(e) {
        //Prevent page reload
        e.preventDefault();

        //var { uname, pass } = document.forms[0];
        //console.log(uname);
        //console.log(pass);
        //console.log(event.target);
        /*
        const {name,value} = event.target
        setUser({
        ...user,//spread operator 
        [name]:value
        })
        console.log(user);*/
        // Find user login info
        //const userData = database.find((user) => user.username === uname.value);

        // When a post request is sent to the create url, we'll check the login credential from database.
        const checkLogin = { ...form };

        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(checkLogin),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        /*
        const userData = login();
        // Compare user info
        if (userData) {
            if (userData.password !== value.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
            } else {
            setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }*/
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
    );

    // JSX code for login form
    const renderForm = (
        <div className="form">
        <form onSubmit={onSubmit}>
            <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} required />
            {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} required />
            {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
            <input type="submit" />
            </div>
        </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}
export default Login