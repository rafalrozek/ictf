
import 'antd/dist/antd.variable.min.css';
import "./axiosConfig";
import './App.css';
import {ConfigProvider, message} from "antd";
import './menu.css'
import {useEffect, useState} from "react";
import {MainWelcomeText} from "./MainWelcomeText.js";
import {LoginForm} from "./LoginForm";
import {HeaderMenu} from "./HeaderMenu";


ConfigProvider.config({
    theme: {
        primaryColor: '#354EC9',
        linkColor: 'red'
    },
});

function Contact() {

    const centerStyle = {
        position: 'relative',

        display: 'flex',
        justifyContent: 'center'
    };

    const rightStyle = {
        marginLeft: 'auto'

    };

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible)
            document.getElementById("mobileItems").style.display = 'block';
        else
            document.getElementById("mobileItems").style.display = 'none';
    }, [visible])


    return (
        <div className="App">
            <div className={"griadient"}/>
            {/*desktop menu*/}
            <HeaderMenu style={centerStyle} style1={rightStyle} onClick={() => {
                setVisible(!visible)
            }}/>


            <div className="container-fluid" style={{padding: "0% calc(10% + 20px)"}}>
                <div className="row">
                    <div className="col-lg-12 gy-4">
                        <div className="b" style={{textAlign: 'left'}}>
                            <h1>Kontakt</h1>
                            <hr/>
                            Aenean et mi rutrum, hendrerit orci sit amet, egestas turpis. Integer ac eleifend diam. Cras consectetur finibus dignissim. Integer scelerisque diam et felis vehicula, id sodales nulla mattis. Sed aliquam arcu vitae justo aliquam euismod. Cras sodales nunc eget lorem sodales facilisis. Nulla sed feugiat ante. Proin malesuada tellus lorem, at placerat ex ullamcorper id. Proin nec vulputate massa, ac efficitur sem. Donec euismod tellus vel luctus volutpat. Phasellus lacinia elit eu nisl molestie, et accumsan mauris ullamcorper. Donec laoreet convallis neque.
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Contact;

