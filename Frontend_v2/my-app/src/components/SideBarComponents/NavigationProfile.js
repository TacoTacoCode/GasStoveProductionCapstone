import React from "react";
import '../../styles/component.scss'
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

class NavigationProfile extends React.Component {
    render() {
        let name = this.props.name;
        let image = this.props.image;
        return (
            <div className="navigation_profile">
                <nav className="column">
                    <center>
                        {/* <img className="img_avatar" alt={name} src={image} /> */}
                        <Avatar src={image} sx={{ width: 250, height: 250 }} />
                    </center>
                    <ul>
                        <li><center><button className="button_nav">Create Forms</button></center></li>
                        <li><center><button className="button_nav">Attendance List</button></center></li>
                        <li><center><button className="button_nav">Request History</button></center></li>
                        <li><center><button className="button_nav">Daily Report</button></center></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavigationProfile;