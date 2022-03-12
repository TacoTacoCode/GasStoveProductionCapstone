import React, { Component } from "react";
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import '../styles/upload-images.component.scss';
import UploadService from "./services/upload-files.service";

export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            currentFile: undefined,
            previewImage: undefined,

            message: "",
            isError: false,
            imageInfos: [],
        };
    }

    componentDidMount() {
        UploadService.getFiles().then((response) => {
            this.setState({
                imageInfos: response.data,
            });
        });
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            message: ""
        });
    }

    render() {
        const {
            currentFile,
            previewImage,
            message,
            isError
        } = this.state;

        return (
            <div className="mg20">
                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={this.selectFile} />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Image
                    </Button>
                </label>
                <div className="file-name">
                    {currentFile ? currentFile.name : null}
                </div>

                {previewImage && (
                    <div>
                        <img className="preview my20" src={previewImage} alt="" />
                    </div>
                )}

                {message && (
                    <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                        {message}
                    </Typography>
                )}
            </div >
        );
    }
}