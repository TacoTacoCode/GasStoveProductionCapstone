import React from "react";
import './Profile.scss'

class Profile extends React.Component {
    state = {
        name: 'Dinh Nhu Hieu',
        phone: '0335365325',
        address: '2695 Pham The Hien, Phuong 7, Quan 8, TPHCM',
        email: 'hieudinhW003@gmail.com',
        gender: '0',
        workerID: 'GSP123',
        role: '1',
    };

    render() {
        return (
            <>
                <div className="top_panel">
                    <a href=".">
                        <div className='container2'>
                            <img className='iconDetails' src='http://uyenphat.com.vn/wp-content/themes/ufa/imgs/logo.png' alt='Bếp Ga Uyên Phát' title="UFA Company Managing System" />
                            <div className="top-title">
                                <p className="top-title1">UFA Company Managing System</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="line_panel" />
                <section className="mid_panel">
                    <nav className="column">
                        <ul>
                            <li><center><button className="button_nav">Create Forms</button></center></li>
                            <li><center><button className="button_nav">Attendance List</button></center></li>
                            <li><center><button className="button_nav">Request History</button></center></li>
                            <li><center><button className="button_nav">Daily Report</button></center></li>
                        </ul>
                    </nav>
                    <div className="row">
                        <div className="row1">1111111</div>
                        <div className="row2">2222222</div>
                    </div>
                </section>
            </>
        )
    }

}

export default Profile;