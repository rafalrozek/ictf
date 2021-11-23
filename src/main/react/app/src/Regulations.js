
import 'antd/dist/antd.variable.min.css';
import "./axiosConfig";
import './App.css';
import {ConfigProvider} from "antd";
import './menu.css'
import {useEffect, useState} from "react";
import {HeaderMenu} from "./HeaderMenu";


ConfigProvider.config({
    theme: {
        primaryColor: '#354EC9',
        linkColor: 'red'
    },
});

function Contact() {

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
                            <h1>Regulamin</h1>
                            <hr/>
                            <ol>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat commodo. Libero justo laoreet sit amet cursus sit amet dictum. Lectus sit amet est placerat in egestas erat. Vel turpis nunc eget lorem dolor. Erat pellentesque adipiscing commodo elit at imperdiet dui. Turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices vitae auctor eu augue ut lectus arcu. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Egestas diam in arcu cursus euismod quis viverra. </li>
                                <p style={{textAlign: "right", marginTop: "20px"}}>iCTF team</p>
                            </ol>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Contact;

