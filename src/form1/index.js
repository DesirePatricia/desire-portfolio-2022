import './Form1.css';
import { Formik } from 'formik';
import { Button, Input, Form, notification } from 'antd';
import { putData, checkSignin } from '../AwsFunctions';

const key = 'updatable';
const openNotification = (username) => {
    notification.open({
        key,
        message: 'Added User Successfully',
        description: 'User: ' + username + ' was added.',
    });
};
const errorNotification = (username) => {
    notification.open({
        key,
        message: 'Error',
        description: 'User: ' + username + ' already exists.',
    });
};

const Form1 = () => {
    const addDataToDynamoDB = async (username, password) => {
        const userData = {
            Username: username,
            Password: password
        }
        let result = await checkSignin('Users', userData);
        if (result){
        await putData('Users', userData);
        openNotification(username);
        }
        else{
        errorNotification(username);
        }
    }
    return (
        <div className="form1-wrapper">
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    addDataToDynamoDB(values.username, values.password)
                }}
            >{({
                values,
                handleChange,
                handleSubmit,
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

export default Form1;