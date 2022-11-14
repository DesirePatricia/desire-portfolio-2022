import React from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchData, deleteItem } from '../AwsFunctions';


class LoginTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginData: "" };
    }
    fetchDataFormDynamoDb = () => {
        fetchData('Users').then(data => this.setState({
            loginData: data
        }))

    };
    
    render() {
        const columns = [
            {
                title: 'Username',
                dataIndex: 'Username',
                key: 'Username',
            },
            {
                title: 'Password',
                dataIndex: 'Password',
                key: 'Password',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (item, record, index) => <a onClick={() => deleteRow(item)}>Delete</a>,
            },
        ];
        const deleteRow =
            (info) => {
                console.log(info);
                deleteItem('Users', info);
                this.fetchDataFormDynamoDb();
            } 
    return (
        <>
        <button onClick={() => this.fetchDataFormDynamoDb()}> Fetch </button>
        <Table columns={columns}
         dataSource={this.state.loginData}/>
        </>
    );
    }
}

export default LoginTable;