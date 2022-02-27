import React from "react";
import '../styles/component.scss'

class HeaderPage extends React.Component {
    render() {
        return (
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
        )
    }
}

export default HeaderPage;