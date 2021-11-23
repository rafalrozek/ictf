import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router-dom";

export function LoginForm() {
    const history = useHistory();
    if(localStorage.getItem("jwtToken")){
        history.push("/dashboard")
    }
    return <Form
        size={"large"}
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => {
            console.log(values)
            axios.post("/auth/login", {name: values.username, password: values.password}).then( (r) =>{
                if(!r.data.jwtToken) message.error('Podano niepoprawne dane logowania.');
                else{
                    localStorage.setItem("jwtToken", r.data.jwtToken);
                    localStorage.setItem("refreshToken", r.data.refreshToken);
                    history.push('/dashboard')
                }
            })

        }}
    >
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Podaj nazwę użytkownika.' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nazwa użytkownika" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Podaj hasło.' }]}
        >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Hasło" />
        </Form.Item>
        <a className="login-form-forgot" href="#recover">
            Przypomnij hasło
        </a>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Zaloguj
            </Button>
        </Form.Item>
    </Form>;
}
