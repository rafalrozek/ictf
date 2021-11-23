
import 'antd/dist/antd.variable.min.css';
import "./axiosConfig";
import './App.css';
import {Collapse, ConfigProvider, message} from "antd";
import './menu.css'
import {useEffect, useState} from "react";
import {MainWelcomeText} from "./MainWelcomeText.js";
import {LoginForm} from "./LoginForm";
import {HeaderMenu} from "./HeaderMenu";
const { Panel } = Collapse;

ConfigProvider.config({
    theme: {
        primaryColor: '#354EC9',
        linkColor: 'red'
    },
});

function Help() {

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


            <div className="container-fluid" style={{padding: "0% calc(10% + 20px)"}}>
                <div className="row">
                    <div className="col-lg-12 gy-4">
                        <div className="b" style={{textAlign: 'left'}}>
                            <h1>Pomoc</h1>
                            <hr/>
                            <Collapse defaultActiveKey={['1']} ghost>
                                <Panel header="Lorem ipsum dolor sit amet, consectetur adipiscing elit?" key="1">
                                    <p>Proin facilisis odio id cursus tincidunt. Cras eleifend metus vitae ipsum semper blandit. Aliquam aliquet lorem id hendrerit commodo. Cras ac cursus nibh. Sed vel convallis massa, eget mollis ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer sollicitudin risus nibh, sed rhoncus massa varius eget. Suspendisse semper non tortor sit amet imperdiet. Mauris id massa in urna tincidunt placerat gravida ut augue.</p>
                                </Panel>
                                <Panel header="Donec at lectus ornare, auctor mauris at, laoreet elit?" key="2">
                                    <p>Pellentesque eu quam eget ex vehicula sollicitudin non non augue. Maecenas consectetur, nunc ac dignissim viverra, erat mauris feugiat nulla, ut auctor augue dui a nulla. Sed mi nunc, ullamcorper quis efficitur a, venenatis euismod tellus. Maecenas nec mauris id arcu vulputate venenatis. Curabitur orci augue, pellentesque congue laoreet nec, posuere et libero.</p>
                                </Panel>
                                <Panel header="Aliquam erat volutpat. Phasellus at lectus rhoncus, blandit orci eget, varius lacus. Cras vel semper lorem?" key="3">
                                    <p>Cras vel semper lorem. Duis felis dui, accumsan sit amet aliquam eu, condimentum ac metus. Ut rutrum leo orci, at tincidunt dui luctus vitae. Nunc hendrerit nibh ut dolor volutpat placerat. Mauris vitae lectus eget nulla rhoncus blandit. Donec eget magna efficitur, cursus erat vitae, blandit mi. Vestibulum in elit congue, lobortis nulla nec, euismod augue. Quisque ac accumsan nibh.</p>
                                </Panel>
                                <Panel header="Donec lacinia efficitur metus, tincidunt tristique purus varius in?" key="4">
                                    <p>Duis non lorem consectetur, consequat purus porta, molestie lorem. Pellentesque vitae dui eu nisl consequat sodales. Donec eu lobortis nulla. Maecenas eu ligula gravida, vehicula orci at, aliquet arcu. Maecenas sem quam, sagittis ut facilisis nec, vestibulum a sapien. Donec ullamcorper mi ut velit auctor dignissim. Integer interdum a sapien in elementum.</p>
                                </Panel>
                                <Panel header="Aenean et mi rutrum, hendrerit orci sit amet, egestas turpis?" key="5">
                                    <p>Integer ac eleifend diam. Cras consectetur finibus dignissim. Integer scelerisque diam et felis vehicula, id sodales nulla mattis. Sed aliquam arcu vitae justo aliquam euismod. Cras sodales nunc eget lorem sodales facilisis. Nulla sed feugiat ante.</p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Help;

