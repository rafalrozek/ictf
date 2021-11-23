import {Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export function HeaderMenu(props) {
    return <>
        <div className={"desktopHeader"}>
            <Menu mode={"horizontal"} style={props.style}>
                <Menu.Item key="home" style={{marginLeft: "10%"}}><Link to={"/"}>Home</Link></Menu.Item>
                <Menu.Item key="regulations" ><Link to={"/regulations"}>Regulamin</Link></Menu.Item>
                <Menu.Item key="contact"><Link to={"/contact"}>Kontakt </Link></Menu.Item>
                <Menu.Item key="help" ><Link to={"/help"}>Pomoc</Link></Menu.Item>
                <Menu.Item key="login" style={props.style1}><Link to={"/"}>Zaloguj</Link></Menu.Item>
                <Menu.Item key="register" style={{marginRight: "10%"}} className={"register-button"}><Link to={"/register"}>Zarejestruj</Link></Menu.Item>
            </Menu>
        </div>
        <div className={"mobileHeader"}>
            <Menu mode={"horizontal"}>
                <Menu.Item key="menu" onClick={props.onClick}><MenuOutlined/></Menu.Item>
            </Menu>
            <Menu mode={"inline"} id={"mobileItems"}>
                <Menu.Item key="home" >Home</Menu.Item>
                <Menu.Item key="regulations">Regulamin</Menu.Item>
                <Menu.Item key="contact">Kontakt</Menu.Item>
                <Menu.Item key="help">Pomoc</Menu.Item>
                <Menu.Item key="login">Zaloguj</Menu.Item>
                <Menu.Item key="register">Zarejestruj</Menu.Item>
            </Menu>
        </div>
    </>;
}