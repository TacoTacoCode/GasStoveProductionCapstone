import React from "react";
import '../../styles/AddAccount.scss';

class AddProduct extends React.Component {
    state = {
        name: 'Dinh Nhu Hieu',
        phone: '0335365325',
        address: '2695 Pham The Hien, Phuong 7, Quan 8, TPHCM',
        email: 'hieudinh003@gmail.com',
        gender: '0',
        workerID: 'GSP123',
        role: '1',
    };

    handleBrowsePicture = () => {
        alert('Browse Picture');
    }

    handleCheckAttendance = (event) => {
        alert('Check Attendance');
    }

    handleCreateAccount = (event) => {
        alert('Create Account - cần validate');
    }

    handleCancel = () => {
        alert('Cancel');
    }

    render() {
        return (
            <>
                <div className="create-account">
                    <div className="top-panel">
                        <text className="text-inside text-title">Create an account</text>
                    </div>
                    <div className="bottom-panel">
                        <div className="data">
                            {/* Profile Picture */}
                            <div className="data-box-button">
                                <div className="small-data-box-1">
                                    <p className="text-header">Profile Picture</p>
                                </div>
                                <div className="small-data-box-2 inline-button">
                                    <p className="button-text">123.jpg</p>
                                    <button className="button-data" onClick={() => this.handleBrowsePicture()}>Browse Picture</button>
                                </div>
                            </div>
                            {/* Full Name */}
                            <div className="data-box-text">
                                <div className="small-data-box-1">
                                    <p className="text-header">Full name</p>
                                </div>
                                <div className="small-data-box-2">
                                    <input className="text-data" defaultValue={this.state.name}></input>
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            {/* Phone No */}
                            <div className="data-box-text">
                                <div className="small-data-box-1">
                                    <p className="text-header">Phone No</p>
                                </div>
                                <div className="small-data-box-2">
                                    <input type={'tel'} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="text-data" defaultValue={this.state.phone}></input>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="data-box-text">
                                <div className="small-data-box-1">
                                    <p className="text-header">Address</p>
                                </div>
                                <div className="small-data-box-2">
                                    <textarea className="text-data" defaultValue={this.state.address}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            {/* Email */}
                            <div className="data-box-text">
                                <div className="small-data-box-1">
                                    <p className="text-header">Email</p>
                                </div>
                                <div className="small-data-box-2">
                                    <input className="text-data" defaultValue={this.state.email}></input>
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="data-box-button">
                                <div className="small-data-box-1">
                                    <p className="text-header">Gender</p>
                                </div>
                                <div className="small-data-box-2">
                                    <p><select className="dropdown-data" defaultValue={this.state.gender}>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr /><br />
                        <text className="label-1">Working Information</text>
                        <div className="data">
                            {/* Worker ID */}
                            <div className="data-box-text">
                                <div className="small-data-box-1">
                                    <p className="text-header">Worker ID</p>
                                </div>
                                <div className="small-data-box-2">
                                    <input className="text-data" defaultValue={this.state.workerID}></input>
                                </div>
                            </div>
                            {/* Role */}
                            <div className="data-box-button">
                                <div className="small-data-box-1">
                                    <p className="text-header">Role</p>
                                </div>
                                <div className="small-data-box-2">
                                    <p><select className="dropdown-data" defaultValue={this.state.role}>
                                        <option value="0">Customer</option>
                                        <option value="1">Worker</option>
                                        <option value="2">Order Manager</option>
                                        <option value="3">Manufacturing Manager</option>
                                    </select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            {/* Worker ID */}
                            <div className="data-box-button">
                                <div className="small-data-box-1">
                                    <p className="text-header">Attendance</p>
                                </div>
                                <div className="small-data-box-2 inline-button">
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    <button className="button-data" onClick={(event) => this.handleCheckAttendance(event)}>Check Attendance</button>
                                </div>
                            </div>
                            <div className="data-box-button" >
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                <button className="button-data primary" onClick={(event) => this.handleCreateAccount(event)}>Add</button>
                                {/* <button className="button-data primary" onClick={() => this.handleCancel()}>Cancel</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddProduct;