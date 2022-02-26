import React from "react";
import '../styles/component.scss'

class NavigationColumn extends React.Component {
    render() {
        let name = this.props.name;
        let image = this.props.image;
        return (
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
        )
    }
}

export default NavigationColumn;