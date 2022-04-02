import React, { useState, useEffect } from "react";
import { SideBarAdminData, SideBarData, SideBarOrderData, SideBarSectionData } from "./SideBarData";
import "../SideBarComponents/SideBarCss.css";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from "react-icons";
import logo from '../../logo512.png'
import { Typography, typography } from '@material-ui/core'
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem';

const styles = makeStyles({
    bar: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: {
            flexDirection: "column"
        }
    },
    menuItem: {
        paddingLeft: "4%",
        textAlign: "left",
        fontFamily: "Muli",
        cursor: "pointer",
        flexGrow: 1,
        // "&:hover": {
        //     color: "#e30217"
        // },
        ['@media (max-width:780px)']: {
            paddingBottom: "2rem"
        }
    },
    logo: {
        cursor: "pointer",
        width: "5%",
        ['@media (max-width:780px)']: {
            display: "inline-block"
        }
    },
    logoNavbar: {
        cursor: "pointer",
        width: "25%",
    }
})

function CustomSideBar() {
    const [sidebar, setSidebar] = useState(false);
    const classes = styles();
    const showSidebar = () => setSidebar(!sidebar);
    const handleLogout = () => {
        // localStorage.removeItem("token");
        localStorage.clear();
        setCurrentUser({ id: '', role: '' });
        // localStorage.removeItem("user");
        window.location.href = "/login";
    };

    function linkClick() {
        window.location.href = "http://localhost:3000/dashboard/";
    }

    const [currentUser, setCurrentUser] = useState({ id: localStorage.getItem('currentId'), role: localStorage.getItem('currentRole') });

    let role = [];

    switch (currentUser.role) {
        case 'Admin':
            role = SideBarAdminData.map(obj => ({ ...obj }));
            break;
        case 'Order Department':
            role = SideBarOrderData.map(obj => ({ ...obj }));
            break;
        case 'Section Department':
            role = SideBarSectionData.map(obj => ({ ...obj }));
            break;
        default:
            break;
    }
    return (

        <>
            <IconContext.Provider value={{ color: '#e30217' }}>
                <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
                    <div className="navbar">
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </div>
                    <img src={logo} className={classes.logo} onClick={linkClick} />
                    <Typography variant="h5" className={classes.menuItem} onClick={linkClick}>
                        UFA Company Managing System
                    </Typography>
                    <MenuItem onClick={() => console.log('Check : ' + currentUser.id + " " + currentUser.role)}>
                        <FaIcons.FaUserCircle />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Toolbar>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                            <img src={logo} className={classes.logoNavbar} onClick={linkClick} />
                        </li>
                        <div className="side">
                            <ul className="sidebarList">
                                {role.map((val, key) => {
                                    return <li
                                        key={key}
                                        className={val.cName}
                                        id={window.location.pathname == val.path ? "active2" : ""}
                                        onClick={() => {
                                            window.location.pathname = val.path;
                                        }}
                                    >
                                        <Link
                                            id={window.location.pathname == val.path ? "active1" : ""}
                                            className="link" to={val.path}>{val.title}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default CustomSideBar