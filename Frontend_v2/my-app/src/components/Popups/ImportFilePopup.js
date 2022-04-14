import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "../../styles/Popup.scss";
import "../../styles/Profile.scss";
import CloseIcon from "@mui/icons-material/Close";
import MaterialTable from "material-table";
import { Button, InputAdornment, makeStyles, MenuItem, TextField, } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from "axios";
import { saveAs } from 'file-saver'
import swal from "sweetalert";

const CssTextField = styled(TextField)({
  width: "100%",
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#e30217",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "#e30217",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e30217",
    },
  },
});

function ImportFilePopup(props) {
  const ref = useRef();

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [typeData, setTypeData] = useState(...props.dataType);
  const stringUrl = "https://localhost:5001/uploadFile/" + typeData;

  useEffect(() => {
    setTypeData(props.dataType)
  }, [props.dataType])
  const handleFileOpen = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const importData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "file",
      file,
      file.name
    );
    axios
      .post(stringUrl, formData)
      .then((res) => {
        console.log({ res })
        if (res.data.toString().includes('error')) {
          console.log('if')
          swal("Error", "Import " + typeData + " File Failed", "error", {
            button: false,
            timer: 2000,
          })
          delay(function () { }, 1000);
          axios({
            url: 'https://localhost:5001/downloadFile?name=' + res.data,
            responseType: 'blob',
            method: 'GET',
          }).then((resp) => {
            saveAs(resp.data, 'error.xlsx')
          })
        } else {
          console.log('eleesee')
          swal("Success", "Import " + typeData + " File Successfully", "success", {
            button: false,
            timer: 2000,
          });
        }
      })
      // .catch((err) => {
      //   swal("Error", "Something wrong in process!", "error", {
      //     button: false,
      //     timer: 2000,
      //   })
      // })
      .finally(() => {
        handleCancelClick();
        //delay(function () { window.location.reload(); }, 2000);
      })
  };

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const handleClose = () => {
    props.setTrigger(false);
    delay(function () { }, 1000);
  };

  const handleCancelClick = () => {
    setFile();
    setFileName("");
    handleClose();
  };

  const handleClearFile = (e) => {
    ref.current.value = null;
    e.target.value = null;
    setFile();
    setFileName("");
  }

  return props.trigger ? (
    <div className="orderpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <br />
            <text className="content_choose">Choose a/an {typeData} file : </text>
            <div className='imagefield'>
              <input ref={ref} type="file" onChange={handleFileOpen} />
            </div>
            {
              (file != null)
                ? <div>
                  <br />
                  <text className="content_choose_file">File {typeData} Detail : </text>
                  <br />
                  <text className="content_choose_custom">File Name: {file.name}</text>
                  <br />
                  <text className="content_choose_custom">
                    Last Modified:{" "}
                    {file.lastModifiedDate.toDateString()}
                  </text>
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    style={{
                      fontFamily: "Muli",
                      borderRadius: 10,
                      backgroundColor: "#e30217",
                      marginLeft: "5%",
                    }}
                    size="medium"
                    type="file"
                    onClick={handleClearFile}
                  >
                    Clear
                  </Button>
                </div>
                : <div>
                  <br />
                  <text className="caution-note">*Note: Choose before Pressing the Upload button</text>
                </div>
            }
            <div className="btngr">
              {
                (file != null)
                  ? <Button
                    type="submit"
                    variant="contained"
                    style={{
                      fontFamily: "Muli",
                      borderRadius: 10,
                      backgroundColor: "#e30217",
                      marginRight: "0.5rem",
                    }}
                    size="large"
                    onClick={importData}
                  >
                    Upload
                  </Button>
                  :
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      fontFamily: "Muli",
                      borderRadius: 10,
                      backgroundColor: "#a9a9a9",
                      marginRight: "0.5rem",
                    }}
                    size="large"
                    disabled
                  >
                    Upload
                  </Button>
              }
              <Button
                variant="contained"
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#e30217",
                }}
                size="large"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  ) : (
    ""
  );
}

export default ImportFilePopup;