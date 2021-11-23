
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

function Home() {
    useEffect( () => {
        if (localStorage.getItem("info")) {
            localStorage.removeItem("info")
            message.success("Zarejestrowano pomyślnie. Możesz się teraz zalogować.")

        }
    }, [])


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


            <div className={"container-fluid"} style={{padding: "5% calc(10% + 20px)"}}>
                <div className={"row mt-lg-5 g-0"}>
                    <div className={"col-md-4"}>
                        <MainWelcomeText/>
                    </div>
                    <div className={"col-md-4"}>
                        <img alt={"welcome"} width={"80%"} style={{marginTop: "50px"}} src={"casual-life-3d-21.png"}/>
                    </div>

                    <div className={"col-md-4 "}>
                        <LoginForm/>
                    </div>

                </div>
                {/*<Row>*/}
                {/*    <Col className={"box"} span={8}>*/}
                {/*        <MainWelcomeText/>*/}
                {/*    </Col>*/}
                {/*    <Col className={"box"} span={8} offset={8}>*/}
                {/*        {<LoginForm/>}*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        </div>
    );
}

export default Home;

