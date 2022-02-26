import React from "react";
import { TabLink, Tabs, TabContent } from "react-tabs-redux";
import FooterPage from "../../components/FooterPage";
import HeaderPage from "../../components/HeaderPage";
import NavigationColumn from "../../components/NavigationColumn";
import './Profile.scss';

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
                <HeaderPage />
                <div className="line_panel" />
                {/* Content */}
                <section className="mid_panel">
                    {/* Left */}
                    <NavigationColumn
                        name={this.state.name}
                        image={this.state.image}
                    />
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
                                                    <input type="number" placeholder={this.state.phone} className="textbox_input" defaultValue={this.state.phone} readOnly={true}></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Email</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" placeholder={this.state.email} className="textbox_input" defaultValue={this.state.email} readOnly={true}></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Address</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" placeholder={this.state.address} className="textbox_input" defaultValue={this.state.address} readOnly={true}></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Gender</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" placeholder={this.state.gender} className="textbox_input" defaultValue={this.state.gender} readOnly={true}></input>
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
                                                    <input type="text" placeholder={this.state.workerID} className="textbox_input" defaultValue={this.state.workerID} readOnly={true}></input>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row2_inside">
                                            <div className="inline2_row1">
                                                <h4 className="row2_h5">Role</h4>
                                            </div>
                                            <div className="inline2_row2">
                                                <span className="span_1">
                                                    <input type="text" placeholder={this.state.role} className="textbox_input" defaultValue={this.state.role} readOnly={true}></input>
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
                <FooterPage />
            </>
        )
    }

}

export default Profile;