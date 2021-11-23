import 'antd/dist/antd.variable.min.css';
import "./axiosConfig";
import './App.css';
import './menu.css'
import {useEffect, useState} from "react";
import {HeaderMenu} from "./HeaderMenu";
import {RegisterForm} from "./RegisterForm";


function Register() {

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


  return (
    <div className="App">
        <div className={"griadient"}/>
        {/*desktop menu*/}
        <HeaderMenu style={centerStyle} style1={rightStyle} onClick={() => {
            setVisible(!visible)
        }}/>


        <div className={"container-fluid"} style={{padding: "5% calc(10% + 20px)"}}>
            <div className={"row mt-lg-5 g-0"}>
                <div className={"col-md-4"}>
                    <h1 className={"title"}>Zarejestruj się,<br/>aby wziąć udział.</h1>
                    <h2 className={"subtitle"}>Zakładając konto, akceptujesz <a href={"/regulations"}
                                                                                   style={{textDecoration: "underline"}} >regulamin
                    </a>.

                    </h2>
                </div>
                <div className={"col-md-4"}>
                    <img alt={"welcome"} width={"80%"} style={{marginTop: "50px"}}  src={"casual-life-3d-21.png"} />
                </div>

                <div className={"col-md-4 "}>
                    <RegisterForm/>
                </div>

            </div>
        </div>
    </div>
  );
}

export default Register;

