import React, { useState } from "react";
import { SideBarData } from "./SideBarData";
import "../SideBarComponents/SideBarCss.css";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from "react-icons";
import logo from '../../logo512.png'
import { Typography, typography } from '@material-ui/core'
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@material-ui/core/styles'


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
        "&:hover": {
            color: "#e30217"
        },
        ['@media (max-width:780px)']: {
            paddingBottom: "2rem"
        }
    },
    logo: {
        width: "5%",
        ['@media (max-width:780px)']: {
            display: "inline-block"
        }
    },
    logoNavbar: {
        width: "25%",
    }
})

function CustomSideBar() {
    const [sidebar, setSidebar] = useState(false);
    const classes = styles();
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{ color: '#e30217' }}>
                <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
                    <div className="navbar">
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    </div>
                    <img src={logo} className={classes.logo} />
                    <Typography variant="h5" className={classes.menuItem}>
                        UFA Company Managing System
                    </Typography>
                </Toolbar>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                            <img src={logo} className={classes.logoNavbar} />
                        </li>
                        <div className="side">
                            <ul className="sidebarList">
                                {SideBarData.map((val, key) => {
                                    return <li
                                        key={key}
                                        className={val.cName}
                                        id={window.location.pathname == val.path ? "active2" : ""}
                                        onClick={() => {
                                            window.location.pathname = val.path;
                                        }}
                                    // className="row"
                                    // id={window.location.pathname == val.path ? "active" : ""}
                                    >
                                        <Link
                                            id={window.location.pathname == val.path ? "active1" : ""}
                                            className="link" to={val.path}>{val.title}</Link>
                                        {/* <div>{val.title}</div> */}
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