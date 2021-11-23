import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {DashboardHeader} from "./DashboardHeader";
import axios from "axios";
import {Table} from "antd";

export default function Users() {
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
    const columns = [
        {
            title: 'Nazwa',
            dataIndex: 'name',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Rozwiązanych zadań',
            dataIndex: 'tasks',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Punkty',
            dataIndex: 'points',
            sorter: (a, b) => a.age - b.age,
        },
    ];

    const [data, setData] = useState([])
    const [rdata, setrData] = useState([])
    const [notifications, setNotification] = useState([])

    useEffect( () => {
        axios.get("http://localhost:8080/api/user/users").then( (resp) => {
            setData(resp.data);
        });
        axios.get("http://localhost:8080/api/user/notifications")
            .then((res) => {
                rdata.notifications = res.data

                setNotification(res.data)

            })
        axios.get("http://localhost:8080/api/user/dashboard")
            .then((res) => {
                rdata.data = res.data;
                setrData(res.data)
            })
    }, [])


    return(
        <>
            <DashboardHeader notifications={notifications} data={rdata} style={centerStyle} style1={rightStyle} onClick={() => logout()} onClick1={() => {
                setVisible(!visible)
            }}/>
            <div className="container-fluid" style={{padding: "0% calc(10% + 20px)"}}>
                <div className="row">
                    <div className="col-lg-12 gy-4">
                        <div className="b">
                        <h1>Lista użytkowników</h1>
                            <hr/>
                            <Table columns={columns} dataSource={data}/>
                        </div>
                    </div>

                </div>

            </div>
        </>


    )

}