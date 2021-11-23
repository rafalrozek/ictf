import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {ScoreBoard} from "./ScoreBoard";
import {DashboardHeader} from "./DashboardHeader";
import {TimeLine} from "./TimeLineModule";
import {Categories} from "./Categories";
import {Tasks} from "./Tasks";
import axios from "axios";

export default function Dashboard() {
    const history = useHistory();

    if (!localStorage.getItem("jwtToken")) {
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


    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible)
            document.getElementById("mobileItems").style.display = 'block';
        else
            document.getElementById("mobileItems").style.display = 'none';
    }, [visible])


    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken")
        history.push("/")
    }

    const [data, setData] = useState([])
    const [tasks, setTasks] = useState([])
    const [events, setEvents] = useState([])
    const [scoreboard, setScoreboard] = useState([])
    const [notifications, setNotifications] = useState([])

    const rdata = [];

    useEffect(() => {
        var socket = new WebSocket('ws://localhost:8080/ws');
        socket.onopen = () => {

        };
        socket.onmessage = ({data}) => {
            if (data === "new") {
                axios.get("http://localhost:8080/api/user/scoreboard")
                    .then((res) => {
                        setScoreboard(res.data)

                    })
                axios.get("http://localhost:8080/api/user/tasks")
                    .then((res) => {
                        setTasks(res.data)

                    })
                axios.get("http://localhost:8080/api/user/dashboard")
                    .then((res) => {
                        setData(res.data)
                    })
            }
            if (data === "notify") {
                axios.get("http://localhost:8080/api/user/notifications")
                    .then((res) => {
                        setNotifications(res.data)

                    })
            }

        }


        const dashboardPromise = axios.get("http://localhost:8080/api/user/dashboard")
            .then((res) => {
                rdata.data = res.data;
            })
        const tasksPromise = axios.get("http://localhost:8080/api/user/tasks")
            .then((res) => {
                rdata.tasks = res.data

            })
        const eventsPromise = axios.get("http://localhost:8080/api/user/events")
            .then((res) => {
                rdata.events = res.data

            })
        const scoreboardPromise = axios.get("http://localhost:8080/api/user/scoreboard")
            .then((res) => {
                rdata.scoreboard = res.data

            })
        const notificationsPromise = axios.get("http://localhost:8080/api/user/notifications")
            .then((res) => {
                rdata.notifications = res.data

            })

        Promise.all([dashboardPromise, tasksPromise, eventsPromise, scoreboardPromise, notificationsPromise]).then(() => {
            setData(rdata.data);
            setTasks(rdata.tasks)
            setEvents(rdata.events);
            setScoreboard(rdata.scoreboard);
            setNotifications(rdata.notifications);

        }, () => history.push("/"))
    }, [])
    return (
        <>
            <DashboardHeader  notifications={notifications} data={data}
                             onClick={() => logout()} onClick1={() => {
                setVisible(!visible)
            }}/>
            <div className="container-fluid" style={{padding: "0% calc(10% + 20px)"}}>
                <div className="row">
                    <div className="col-lg-4 gy-4">
                        <div className="b">
                            <TimeLine events={events}/>
                        </div>
                    </div>
                    <div className="col-lg-8 gy-4">
                        <div className="b">
                            <ScoreBoard data={scoreboard}/>
                        </div>
                    </div>
                    <div className="col-lg-4 gy-4">
                        <div className="b">
                            <Categories tasks={tasks}/>
                        </div>
                    </div>
                    <div className="col-lg-8 gy-4">
                        <div className="b">
                            <Tasks tasks={tasks} done={data.doneTasks}/>
                        </div>
                    </div>
                </div>

            </div>
        </>


    )

}