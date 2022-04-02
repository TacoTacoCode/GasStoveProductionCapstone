import React, { useState, useEffect } from "react";
import { TabLink, Tabs, TabContent } from "react-tabs-redux";
import FooterPage from "../SideBarComponents/FooterPage";
import NavigationProfile from "../SideBarComponents/NavigationProfile";
import '../../styles/Profile.scss';
import axios from "axios";

function Profile() {
    // state = {
    //     name: 'Dinh Nhu Hieu',
    //     phone: '0335365325',
    //     address: '2695 Pham The Hien, Phuong 7, Quan 8, TPHCM',
    //     email: 'hieudinhW003@gmail.com',
    //     gender: 'Male',
    //     workerID: 'GSP123',
    //     role: 'Manufacturing Manager',
    //     image: 'https://1.bp.blogspot.com/-fZFuHlaPUhs/YGLZa02W4xI/AAAAAAAArDQ/CBAWz3Nr7qU65dmF9oleJoHrpClyTOA-ACNcBGAsYHQ/s0/63af987a2cf528462ae90e36c72f6e96.jpeg',
    // };

    const currentUserID = localStorage.getItem('currentId');
    const [currentUser, setCurrentUser] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:5001/getAccountById/" + currentUserID)
            .then((res) => {
                setCurrentUser(res.data);
            });
    }, []);

    useEffect(() => {
        axios.get("https://localhost:5001/getRoles")
            .then((res) => {
                setRoles(res.data);
            });
    }, [])


    return (
        <>
            {/* Header */}
            {/* <HeaderPage /> */}
            <div className="line_panel" />
            {/* Content */}
            <section className="mid_panel">
                {/* Left */}
                <NavigationProfile
                    name={currentUser.name}
                    image="https://1.bp.blogspot.com/-fZFuHlaPUhs/YGLZa02W4xI/AAAAAAAArDQ/CBAWz3Nr7qU65dmF9oleJoHrpClyTOA-ACNcBGAsYHQ/s0/63af987a2cf528462ae90e36c72f6e96.jpeg"
                />
                <div className="row">
                    {/* Right 1 */}
                    <div className="row1">
                        <div className="row1_inside">
                            <div className="inline_row1">
                                <h3 className="row1_h3">&emsp;{currentUser.name}</h3>
                                <h4 className="row1_h4">&emsp;
                                    {
                                        roles.map((item) => {
                                            if (item.roleId == currentUser.roleId) {
                                                return item.name
                                            }
                                        })
                                    }
                                </h4>
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
                                            <h3 className="row2_h5">Phone</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                <input type="number" placeholder={currentUser.phone} className="textbox_input" defaultValue={currentUser.phone} readOnly={true}></input>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row2_inside">
                                        <div className="inline2_row1">
                                            <h3 className="row2_h5">Email</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                <input type="text" placeholder={currentUser.email} className="textbox_input" defaultValue={currentUser.email} readOnly={true}></input>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row2_inside">
                                        <div className="inline2_row1">
                                            <h3 className="row2_h5">Address</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                <input type="text" placeholder={currentUser.address} className="textbox_input" defaultValue={currentUser.address} readOnly={true}></input>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row2_inside">
                                        <div className="inline2_row1">
                                            <h3 className="row2_h5">Gender</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                <input type="text" placeholder={currentUser.gender} className="textbox_input"
                                                    defaultValue={(currentUser.gender == true) ? "Male" : "Female"}
                                                    readOnly={true}></input>
                                            </span>
                                        </div>
                                    </div>
                                </TabContent>
                                <TabContent for="tab2">
                                    <div className="row2_inside">
                                        <div className="inline2_row1">
                                            <h3 className="row2_h5">Worker ID</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                <input type="text" placeholder={currentUser.workerID} className="textbox_input" defaultValue={currentUser.workerId} readOnly={true}></input>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row2_inside">
                                        <div className="inline2_row1">
                                            <h3 className="row2_h5">Role</h3>
                                        </div>
                                        <div className="inline2_row2">
                                            <span className="span_1">
                                                {
                                                    roles.map((item) => {
                                                        if (item.roleId == currentUser.roleId) {
                                                            return (<input type="text" placeholder={currentUser.role} className="textbox_input"
                                                                defaultValue={item.name}
                                                                readOnly={true}></input>)
                                                        }
                                                    })
                                                }
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

export default Profile;