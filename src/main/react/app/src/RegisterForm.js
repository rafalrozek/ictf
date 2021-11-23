import {Button, Form, Input, message} from "antd";
import axios from "axios";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

export function RegisterForm() {
    const history = useHistory();

    return <Form
        size={"large"}
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => {
            console.log(values)
            axios.post("/auth/register", {email: values.email, password: values.password, name: values.username}).then( (r) =>{
                if(r.data.id < 1) message.error('Błąd :(');
                else{
                    localStorage.setItem("info", "Pomyślnie założono konto. Możesz się teraz zalogować.");
                    history.push('/login')
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
            name="email"
            rules={[{ required: true, message: 'Podaj adres email.' }]}

        >
            <Input type={"email"} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
        <Form.Item
            name="password2"
            rules={[{ required: true, message: 'Podaj hasło.' }]}
        >
            <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Powtórz hasło" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Zarejestruj
            </Button>
        </Form.Item>
    </Form>;
}