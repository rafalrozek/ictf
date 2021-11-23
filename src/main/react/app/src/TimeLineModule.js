import {Timeline} from "antd";

export function TimeLine(props) {
    return <>
        <p>Linia czasu</p>
        <hr/>
        <Timeline style={{height: "315px"}} >
            {props.events.map( (e, i) => (
                <Timeline.Item key={i}> <b>{e.date}</b> {e.description}</Timeline.Item>
            ) )}


        </Timeline>
    </>
}