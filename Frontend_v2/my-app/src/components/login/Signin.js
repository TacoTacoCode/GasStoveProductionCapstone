import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import './Signin.scss';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

async function loginUser(credentials) {
    return fetch('https://www.mecallapi.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Signin() {
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        if ('accessToken' in response) {
            swal("Success", response.message, "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    localStorage.setItem('accessToken', response['accessToken']);
                    localStorage.setItem('user', JSON.stringify(response['user']));
                    window.location.href = "/dashboard";
                });
        } else {
            swal("Failed", response.message, "error");
        }
    }

    return (
        <>
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
            <div className="dashboard_login">
                <div className="title-container">
                    <center><h2>UFA Company Managing System</h2></center>
                    <div className="login-container">
                        <div><center><img className='img-login' src='http://uyenphat.com.vn/wp-content/themes/ufa/imgs/logo.png' alt='Bếp Ga Uyên Phát'></img></center></div>
                        <div className="container">
                            <center>
                                <form noValidate onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth

                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        onChange={e => setUserName(e.target.value)}
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
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <div><a href={'_'}>Forgot Password</a></div>
                                    <br />
                                    <div className="button_login">
                                        <center>
                                            <button onClick={(event) => this.handleSubmit(event)}>Login</button>
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