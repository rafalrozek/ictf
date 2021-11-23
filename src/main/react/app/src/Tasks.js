import {Badge, Button, Input, message} from 'antd';
import {useState} from "react";
import Modal from "antd/es/modal/Modal";
import axios from "axios";


function Task(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log(input)
        axios.post("http://localhost:8080/api/user/validateflag", {id: props.t.id, flag: input})
            .then((res) => {
                if(res.data === 0){
                    setInput('')

                    message.success("Gratulacje! Podałeś poprawną flage.")
                    setIsModalVisible(false);
                }
                else if(res.data === 1){
                    setInput('')
                    message.error("Już rozwiązałeś to zadanie.")
                    setIsModalVisible(false);
                }
                else if(res.data === 2){
                    setInput('')
                    message.error("Brak zadania o podanym Id.")
                }
                else{
                    setInput('')
                    message.error("Podałeś niepoprawną flage :(")
                }
            })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    let categories = {
        1 : "Web",
        2 : "Pwn",
        3 : "Crypto",
        4 : "Misc",
        5 : "RE"
    }
    return (
        <>
            <Modal title={categories[props.t.category] + ": "+ props.t.title + " (" + props.t.points + "pkt)"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer= { !props.done?[
                <span>
                    <Input placeholder={"Flaga"} style={{width: "80%"}} value={input} onInput={e => setInput(e.target.value)}/>
                    <Button style={{width: "20%"}} key="submit" type="primary"  onClick={handleOk}>
                        Wyślij
                    </Button>
                </span>
            ] : []}>
                <p>{props.t.description}</p>
            </Modal>

            <div className={"col-sm-2"}>
                {props.done? (
                    <>
                    <Badge.Ribbon text="Rozwiązane" color="green">
                        <div className={"task d-flex align-items-start flex-column"}><p>{props.t.title}</p>
                            <div onClick={showModal} className={"mt-auto mx-auto text-center solve"}> Zobacz</div>
                        </div>
                        <div className={"points mx-auto"}>100</div>
                    </Badge.Ribbon>
                    </>
                ) : (
                    <>
                        <div className={"task d-flex align-items-start flex-column"}><p>{props.t.title}</p>
                            <div onClick={showModal} className={"mt-auto mx-auto text-center solve"}>Zobacz</div>
                        </div>
                        <div className={"points mx-auto"}>100</div>
                    </>
                )}

            </div>
        </>


    );
}

export function Tasks(props) {

    return <>
        <p>Zadania</p>
        <hr/>
        <div className={"row g-3 p-3"}>
            {props.tasks.map( (t,i) => (

                <Task t={t} key={i} done={props.done.includes(t.id)}/>
            ))}
        </div>

    </>;
}