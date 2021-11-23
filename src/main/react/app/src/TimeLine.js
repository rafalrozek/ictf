import {useHistory} from "react-router-dom";
import {Menu, Timeline} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

function DashboardHeader(props) {
    return <>
        <div className={"desktopHeader"}>
            <Menu mode={"horizontal"} style={props.style}>
                <Menu.Item style={{marginLeft: "10%"}}>Home</Menu.Item>
                <Menu.Item>Użytkownicy</Menu.Item>
                <Menu.Item>Kontakt</Menu.Item>
                <Menu.Item>Pomoc</Menu.Item>
                <Menu.Item style={props.style1} onClick={props.onClick}>Wyloguj</Menu.Item>
                <Menu.Item style={{marginRight: "10%"}} className={"register-button"}>Konto</Menu.Item>
            </Menu>
        </div>
        <div className={"mobileHeader"}>
            <Menu mode={"horizontal"}>
                <Menu.Item onClick={props.onClick1}><MenuOutlined/></Menu.Item>
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
    </>;
}

function TimeLine() {
    return <>
        <p>Linia czasu</p>
        <hr/>
        <Timeline>
            <Timeline.Item >Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item> Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
        </Timeline>
    </>;
}

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
            <DashboardHeader style={centerStyle} style1={rightStyle} onClick={() => logout()} onClick1={() => {
                setVisible(!visible)
            }}/>
            <div className="container-fluid" style={{padding: "5% calc(10% + 20px)"}}>
                <div className="row">
                    <div className="col-lg-4 gy-4">
                        <div className="b">
                            <TimeLine/>
                        </div>
                    </div>
                    <div className="col-lg-8 gy-4">
                        <div className="b">
                            <p>Wyniki</p>
                            <hr/>
                            dadw
                        </div>
                    </div>
                    <div className="col-lg-4 gy-4">
                        <div className="b">
                            <p>Kategorie</p>
                            <hr/>
                            dadw
                        </div>
                    </div>
                    <div className="col-lg-8 gy-4">
                        <div className="b">
                            <p>Zadania</p>
                            <hr/>
                            dadw
                        </div>
                    </div>
                </div>

            </div>
        </>


    )

}