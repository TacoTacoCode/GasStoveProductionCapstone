import React from "react";
import '../../styles/component.scss'
import Avatar from '@mui/material/Avatar';

class NavigationProfile extends React.Component {
    render() {
        let name = this.props.name;
        let role = this.props.role;
        let image = this.props.image;
        return (
            <div className="navigation_profile">
                <nav className="column">
                        <Avatar src={image} sx={{ width: '180px', height: '180px' }} />
                    <ul>
                        {/* <li><center><button className="button_nav">Create Forms</button></center></li> */}
                        {
                            (role != 'Admin')
                                ? <li><center><button
                                    onClick={() => {
                                        localStorage.setItem('choiceUser', localStorage.getItem('currUser'))
                                        window.location.href = '/dashboard/attendance'
                                    }}
                                    className="button_nav">Attendance
                                </button></center></li>
                                : ""
                        }
                        {/* <li><center><button className="button_nav">Attendance</button></center></li>
                        <li><center><button className="button_nav">Daily Report</button></center></li> */}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavigationProfile;