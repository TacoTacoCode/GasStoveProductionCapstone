import React from "react";
import { TabLink, Tabs, TabContent } from "react-tabs-redux";
import './Profile.scss'

class Profile extends React.Component {
    state = {
        name: 'Dinh Nhu Hieu',
        phone: '0335365325',
        address: '2695 Pham The Hien, Phuong 7, Quan 8, TPHCM',
        email: 'hieudinhW003@gmail.com',
        gender: 'Male',
        workerID: 'GSP123',
        role: 'Manufacturing Manager',
        image: 'https://1.bp.blogspot.com/-fZFuHlaPUhs/YGLZa02W4xI/AAAAAAAArDQ/CBAWz3Nr7qU65dmF9oleJoHrpClyTOA-ACNcBGAsYHQ/s0/63af987a2cf528462ae90e36c72f6e96.jpeg',
    };

    render() {
        return (
            <>
                {/* Header */}
                <header className="top_panel">
                    <a href=".">
                        <div className='container2'>
                            <img className='iconDetails' src='http://uyenphat.com.vn/wp-content/themes/ufa/imgs/logo.png' alt='Bếp Ga Uyên Phát' title="UFA Company Managing System" />
                            <div className="top-title">
                                <p className="top-title1">UFA Company Managing System</p>
                            </div>
                        </div>
                    </a>
                </header>
                <div className="line_panel" />
                {/* Content */}
                <section className="mid_panel">
                    {/* Left */}
                    <nav className="column">
                        <center>
                            <img className="img_avatar" alt={this.state.name} src={this.state.image} />
                        </center>
                        <ul>
                            <li><center><button className="button_nav">Create Forms</button></center></li>
                            <li><center><button className="button_nav">Attendance List</button></center></li>
                            <li><center><button className="button_nav">Request History</button></center></li>
                            <li><center><button className="button_nav">Daily Report</button></center></li>
                        </ul>
                    </nav>
                    <div className="row">
                        {/* Right 1 */}
                        <div className="row1">
                            <div className="row1_inside">
                                <div className="inline_row1">
                                    <h3 className="row1_h3">&emsp;{this.state.name}</h3>
                                    <h4 className="row1_h4">&emsp;{this.state.role}</h4>
                                </div>
                                <div className="inline_row2">
                                    <span className="span_1">
                                        <button className="button_edit_profile">Edit Profile</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="line_panel" />
                        {/* Right 2 */}
                        <div className="row2">
                            {/* Tab */}
                            <Tabs className="tabs tabs-1">
                                <div className="tab-links">
                                    <TabLink to="tab1">About</TabLink>
                                    <TabLink to="tab2">Working Information</TabLink>
                                </div>

                                <div className="content">
                                    <TabContent for="tab1">
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Phone</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.phone} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Email</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.email} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Address</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.address} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Gender</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.gender} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                    </TabContent>
                                    <TabContent for="tab2">
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Worker ID</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.workerID} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Role</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" className="textbox_input" defaultValue={this.state.role} readOnly></input>
                                                </span>
                                            </div>
                                        </div>
                                    </TabContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </section>
                <div className="line_panel" />
                {/* Footer */}
                <footer className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                {/* nhập về công ty uyên phát */}
                                <h6>About</h6>
                                <p className="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
                            </div>

                            <div className="col-xs-6 col-md-3" />
                            <div className="col-xs-6 col-md-3" />
                        </div>
                        <hr />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-6 col-xs-12">
                                <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by&nbsp;
                                    <a href=".">GSP</a>.
                                </p>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-12" />
                        </div>
                    </div>
                </footer>
            </>
        )
    }

}

export default Profile;