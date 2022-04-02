import React from "react";
import '../../styles/component.scss'

class NavigationProfile extends React.Component {
    render() {
        let name = this.props.name;
        let image = this.props.image;
        return (
            <div className="navigation_profile">
                <nav className="column">
                    <center>
                        <img className="img_avatar" alt={name} src={image} />
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