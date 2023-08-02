import '../form1/Form1.css';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet'
import { Button, Input, Form, notification } from 'antd';
import { getData, fetchData } from '../AwsFunctions';

const key = 'updatable';
const openNotification = (username) => {
    notification.open({
        key,
        message: 'Logged in User Successfully',
        description: 'User: ' + username + ' was added.',
    });
};

const openNotificationError = () => {
    notification.open({
        key,
        message: 'Logged in User Failed',
        description: 'Either username or password was incorrect.',
    });
};

const Login = () => {
    const getDataFromDynamoDB = async (username, password) => {
        const userData = {
            Username: username,
            Password: password
        }

        const result = await getData('Users', userData)
        if (result){
            openNotification(username);
        }
        else{
            openNotificationError();
        }
        
    }
    return (
        <div className="form1-wrapper">
            <Helmet title="Login" />
            <h1>Log In</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    getDataFromDynamoDB(values.username, values.password)
                }}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                onFinishFailed
            }) => (
                <Form
                    className="login-form"
                    onSubmit={handleSubmit}
                    initialValues={values}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        className='form-button'
                        wrapperCol={{
                            span: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>)}
            </Formik>
        </div>
    );
}

export default Login;