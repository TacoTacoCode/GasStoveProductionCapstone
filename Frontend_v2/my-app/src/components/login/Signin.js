import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import './Signin.scss';
import jwt from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

async function loginUser(credentials) {
    return fetch('https://localhost:5001/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Signin() {
    //Title
    useEffect(() => {
        document.title = "UFA - Login"
    }, []);

    const classes = useStyles();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            phone,
            password
        });
        if (response.success) {
            swal("Success", "Login Successful!", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    const token = response['token'];
                    const user = jwt(token);
                    localStorage.setItem('token', response['token']);
                    localStorage.setItem('currentId', user.id);
                    localStorage.setItem('currentRole', user.role);
                    switch (user.role) {
                        case "Admin":
                            window.location.href = "/dashboard";
                            break;
                        case "Manufacturer Deparment":
                            window.location.href = "/dashboard/accounts";
                            break;
                        case "Order Department":
                            window.location.href = "/orders";
                            break;
                        case "Section Department":
                            window.location.href = "/section/materials";
                            break;
                        default:
                            console.log("Not Adminnnnnn");
                            break;
                    }
                });
        } else {
            swal("Failed", "User or Password is not correct", "error");
        }

    }

    return (
        <>
            <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script>
            <div className="dashboard_login">
                <div className="title-container">
                    <center><h2>UFA Company Managing System</h2></center>
                    <div className="login-container">
                        <div><center><img className='img-login' src='http://uyenphat.com.vn/wp-content/themes/ufa/imgs/logo.png' alt='Bếp Gas Uyên Phát'></img></center></div>
                        <div className="container">
                            <center>
                                <form noValidate onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth

                                        id="phone"
                                        name="phone"
                                        label="Phone No"
                                        onChange={e => {
                                            setPhone(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth

                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={e => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <div><a href={'_'}>Forgot Password</a></div>
                                    <br />
                                    <div className="button_login">
                                        <center>
                                            <button className='btn_login' type='submit'>Login</button>
                                        </center>
                                    </div>
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}