import {Alert, Badge, Card, Dropdown, Menu, Tooltip} from "antd";
import {LogoutOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";
import Avatar from "antd/es/avatar/avatar";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import {useEffect, useState} from "react";

export function DashboardHeader(props) {
    const style1 = {
        marginLeft: 'auto'

    };

    const menu = (
        <>
        <Card
            style={{ width: 300 }}
            actions={[
                <Tooltip placement="top" title={"Wyloguj"}><LogoutOutlined key={"logout"} onClick={props.onClick} /> </Tooltip>,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={props.data.name}
                description={props.data.email}

            />
            {props.notifications.map((n, i) => (
                <Alert key={i + "_"+ n.message} message={n.message} id={i + "_"+n.message} type="info" closable onClose={  () => {
                    //delete notification
                     axios.delete("http://localhost:8080/api/user/notification/"+n.id)
                }} />
            ))}

        </Card>
        </>
    );

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect( () => {
        if(props.data.roles !== undefined){
            if(props.data.roles[0] == "ROLE_ADMIN"){
                    setIsAdmin(true)
            }

        }

    }, [props.data.roles])
    return <>

        <div className={"desktopHeader"}>
            <Menu mode={"horizontal"} >
                <Menu.Item key="home" style={{marginLeft: "10%"}}> <Link to={"/"} > Start</Link> </Menu.Item>
                <Menu.Item key="users"><Link to={"/users"} > Użytkownicy </Link></Menu.Item>
                {  isAdmin &&
                        <Menu.Item key="admin"><Link to={"/admin"} > Panel Administratora </Link></Menu.Item>

                }
                <Menu.Item key="user" style={{...style1, marginRight: "10%"}} className={""}>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Badge size={"small"} count={props.notifications.length.toString()} offset={[0, 5]}>
                            <Avatar icon={<UserOutlined />} />
                        </Badge>
                    </Dropdown>


                </Menu.Item>
            </Menu>
        </div>
        <div className={"mobileHeader"}>
            <Menu mode={"horizontal"}>
                <Menu.Item key="home" onClick={props.onClick1}><MenuOutlined/></Menu.Item>
            </Menu>
            <Menu mode={"inline"} id={"mobileItems"}>
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="regulations">Regulamin</Menu.Item>
                <Menu.Item key="contact">Kontakt</Menu.Item>
                <Menu.Item key="help">Pomoc</Menu.Item>
                <Menu.Item key="login">Zaloguj</Menu.Item>
                <Menu.Item key="register">Zarejestruj</Menu.Item>
            </Menu>
        </div>
    </>
}