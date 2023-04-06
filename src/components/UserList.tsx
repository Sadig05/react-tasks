import React, {useEffect} from 'react';
import {Button, Table, Input, Space} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';
import {useState} from "react";
import axios from "../utils/axios"
import {Spin} from 'antd';
import { Link } from 'react-router-dom';
import UserForm from "./UserForm";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { ThemeProvider } from '../ThemeProvider'
import {ThemeContext, Theme} from '../ThemeContext'
import {useContext} from "react";
// import axios from "axios";
export interface DataType {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    ip_address?: string | undefined;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'first_name',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        width: '20%',
        // onFilter: (value: string, record) => record.first_name.toLowerCase().startsWith(value.toLowerCase()),
        filterSearch: true
    },

    {
        title: 'Last name',
        dataIndex: 'last_name',
        sorter: (a, b) => a.last_name.localeCompare(b.last_name),
        width: '20%',

    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            {
                text: 'Female',
                value: 'Female',
            },
            {
                text: 'Non-binary',
                value: 'Non-binary',
            },
            {
                text: 'Male',
                value: 'Male',
            },
            {
                text: 'Polygender',
                value: 'Polygender',
            },
            {
                text: 'Genderfluid',
                value: 'Genderfluid',
            },
            {
                text: 'Genderqueer',
                value: 'Genderqueer',
            }
        ],
        onFilter: (value: string, record) => record.gender.startsWith(value),
        filterSearch: true,
        width: '20%',
    },
    {
        title: 'Ip address',
        dataIndex: 'ip_address',
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        width: '10%',
    },
    {
        key: "5",
        title: "Actions",
        render: (user: DataType) => {
            return (
                <>
                    <Link to={`/user-form/${user.id}`}>
                        <EditOutlined style={{ color: "blue", marginLeft: 12 }} />
                    </Link>
                    <DeleteOutlined
                        onClick={() => {
                            console.log("delete");
                            // call function to handle delete action
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                    />
                </>
            );
        },
        width: '20%',
    },


];


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { theme } = useContext(ThemeContext);
    const fetchUsers = async () => {
        setLoading(true);
        const params = search ? { q: search } : {};
        const result = await axios.get("/users", { params });
        console.log(params);
        console.log(result.data);
        setUsers(result.data);
        setLoading(false);
    };



    useEffect(() => {
        fetchUsers();
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div style={{ background: theme === "light" ? "#f0f0f0" : "#333" }}>
            <Space>
                <Button type="primary">
                    <Link to="/user-form">Add user</Link>
                </Button>

                <Input.Search
                    placeholder="Search user"
                    allowClear
                    enterButton="Search"
                    onSearch={handleSearch}
                    style={{ width: 300, margin: "16px 0" }}
                />

            </Space>



            {/*<Button onClick={clearSearch}>Clear</Button>*/}

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={users.map(user => ({...user, key: user.id}))}
                    onChange={onChange}
                />
            </Spin>
        </div>
    );
};



export default UserList;