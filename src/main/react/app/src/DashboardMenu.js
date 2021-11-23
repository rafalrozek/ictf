import {useHistory} from "react-router-dom";
import {Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const history = useHistory();

    if(!localStorage.getItem("jwtToken")){
        history.push("/")
    }

    const centerStyle = {
        position: 'relative',

        display: 'flex',
        justifyContent: 'center'
    };

    const rightStyle = {
        marginLeft: 'auto'

    };

    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        if(visible)
            document.getElementById("mobileItems").style.display = 'block';
        else
            document.getElementById("mobileItems").style.display = 'none';
    }, [visible])


    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken")
        history.push("/")
    }

    return(
        <>
            <div className={"desktopHeader"}>
                <Menu mode={"horizontal"} style={centerStyle}>
                    <Menu.Item style={{marginLeft: "10%"}}>Home</Menu.Item>
                    <Menu.Item>Użytkownicy</Menu.Item>
                    <Menu.Item>Kontakt</Menu.Item>
                    <Menu.Item>Pomoc</Menu.Item>
                    <Menu.Item style={rightStyle} onClick={ () => logout() }>Wyloguj</Menu.Item>
                    <Menu.Item style={{marginRight: "10%"}} className={"register-button"}>Konto</Menu.Item>
                </Menu>
            </div>
            <div className={"mobileHeader"}>
                <Menu mode={"horizontal"}>
                    <Menu.Item onClick={ () => { setVisible(!visible)}}><MenuOutlined/></Menu.Item>
                </Menu>
                <Menu mode={"inline"} id={"mobileItems"}>
                    <Menu.Item>Home</Menu.Item>
                    <Menu.Item>Regulamin</Menu.Item>
                    <Menu.Item>Kontakt</Menu.Item>
                    <Menu.Item>Pomoc</Menu.Item>
                    <Menu.Item>Zaloguj</Menu.Item>
                    <Menu.Item>Zarejestruj</Menu.Item>
                </Menu>
            </div>
        </>
    )

}