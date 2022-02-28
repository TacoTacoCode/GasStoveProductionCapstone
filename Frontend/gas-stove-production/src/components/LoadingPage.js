import React from "react";
import '../styles/LoadingPage.scss';

class LoadingPage extends React.Component {
    render() {
        return (
            <>
                <center>
                    <img className="img_loading" src="http://uyenphat.com.vn/wp-content/themes/ufa/imgs/logo.png" alt="uyenphat" />
                    <div className="loading">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </center>
            </>
        )
    }
}

export default LoadingPage;