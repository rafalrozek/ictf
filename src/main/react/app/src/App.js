import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Regulations from "./Regulations";
import Users from "./Users";
import Contact from "./Contact";
import Help from "./Help";
import Admin from "./Admin";

export function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/register"} component={Register} />
                <Route exact path={"/contact"} component={Contact} />
                <Route exact path={"/help"} component={Help} />
                <Route path={"/dashboard"} component={Dashboard}/>
                <Route path={"/regulations"} component={Regulations}/>
                <Route path={"/users"} component={Users}/>
                <Route path={"/admin"} component={Admin}/>
                <Redirect to={"/"}/>

            </Switch>

        </BrowserRouter>
    )
}