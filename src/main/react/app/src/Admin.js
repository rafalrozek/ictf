import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {ScoreBoard} from "./ScoreBoard";
import {DashboardHeader} from "./DashboardHeader";
import {TimeLine} from "./TimeLineModule";
import {Categories} from "./Categories";
import {Tasks} from "./Tasks";
import axios from "axios";
import {Button, Form, Input, InputNumber, Select, Table, Tag, TimePicker} from "antd";
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import moment from "moment";

function UsersManage() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        axios.post("/admin/sendNotification", {
            users: selected.map( s => s.name ),
            message: values.title,
        } )

        // setIsModalVisible(false)
    }


    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows)
        },
    };

    useEffect( () => {
        axios.get("http://localhost:8080/api/user/users").then( (resp) => {
            setData(resp.data);
        });
    }, [])
    const columns = [
        {
            title: 'Nazwa',
            dataIndex: 'name',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Email',
            dataIndex: 'email',
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

    return <>
        <h2>Zarządzanie użytkownikami</h2>
        <Button type="primary" onClick={showModal} disabled={!selected.length > 0}>
            Wyślij powiadomienie
        </Button>
        <Modal title="Wyślij powiadomienie" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form labelCol={{span: 4}} wrapperCol={{span: 20}} name="control-hooks"  onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Opis"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="to"
                    label="Do"
                >
                    {selected.map((s, i) => {
                        return (
                            <Tag>{s.name}</Tag>
                        )
                    })}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Dodaj
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
}

function TasksManage() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onFinish = (values) => {
        axios.post("admin/addTask", {
            title: values.name,
            description: values.desc,
            flag: values.flag,
            points: values.points,
            category: values.category,

        }).then( () => {
            axios.get("http://localhost:8080/api/user/tasks").then( (resp) => {
                setData(resp.data);
                setIsModalVisible(false);
            });

        })



    };

    let categories = {
        1 : "Web",
        2 : "Pwn",
        3 : "Crypto",
        4 : "Misc",
        5 : "RE"
    }

    const [data, setData] = useState([]);


    useEffect( () => {
        axios.get("http://localhost:8080/api/user/tasks").then( (resp) => {
            setData(resp.data);
        });
    }, [])
    const columns = [
        {
            title: 'Nazwa',
            dataIndex: 'title',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Punkty',
            dataIndex: 'points',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Kategoria',
            dataIndex: 'category',
            sorter: (a, b) => a.age - b.age,
            render: (t,r,i) => { return categories[t]}
        },
        {
            title: 'Punkty',
            dataIndex: 'points',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Akcja',
            dataIndex: '',
            render: (t,r,i) => { return <Button onClick={ () => {
                axios.post("/admin/deleteTask/" + t.id).then( () => {
                    axios.get("http://localhost:8080/api/user/tasks").then( (resp) => {
                        setData(resp.data);
                    });
                })
            }
            }>Usuń</Button>}
        },
    ];


    return <>
        <h2>Zarządzanie zadaniami  <Button type="primary" onClick={showModal}>
        Dodaj zadanie
      </Button> </h2>
        <Modal title="Nowe zadanie" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form labelCol={{span: 4}} wrapperCol={{span: 20}} name="control-hooks" onFinish={onFinish} >
                <Form.Item
                    name="name"
                    label="Nazwa"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="desc"
                    label="Opis"
                    rules={[{required: true,}]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="points"
                    label="Punkty"
                    rules={[{required: true,}]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Kategoria"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Wybierz kategorie">
                        <Option value="1">Web</Option>
                        <Option value="2">Pwn</Option>
                        <Option value="3">Cryto</Option>
                        <Option value="4">Misc</Option>
                        <Option value="5">RE</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="flag"
                    label="Flaga"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Dodaj
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
        <Table  columns={columns} dataSource={data} />
    </>
}

export default function Admin() {
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        let d = moment(values.time).format("HH:mm");
        axios.post("admin/addEvent", {date: d, description: values.title});
        setIsModalVisible(false);

    };


    if (!localStorage.getItem("jwtToken")) {
        history.push("/")
    }

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
                    <div className="col-lg-12 gy-4">
                        <div className="b">
                            <h1>Panel Administratora  <Button type="primary" onClick={showModal}>
                                Dodaj zdarzenie
                            </Button></h1>
                            <Modal title="Nowe zdarzenie" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                <Form labelCol={{span: 4}} wrapperCol={{span: 20}} name="control-hooks" onFinish={onFinish}>
                                    <Form.Item
                                        name="title"
                                        label="Opis"
                                        rules={[{required: true,}]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="time"
                                        label="Godzina"
                                        rules={[{required: true,}]}
                                    >
                                        <TimePicker placeholder={"Wybierz godzine"} format={"HH:mm"}/>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Dodaj
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </Modal>
                            <hr/>
                            <UsersManage />
                            <TasksManage />
                        </div>
                    </div>

                </div>

            </div>
        </>


    )

}