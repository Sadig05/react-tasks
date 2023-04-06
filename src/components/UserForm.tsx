import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, Select, Spin} from 'antd';
import axios from "../utils/axios";
import {useParams, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {ThemeContext} from "../ThemeContext";
interface UserFormProps {
    isEdit: boolean;
    userID: any;
    // onFinish: (values: any) => void;
    // onFinishFailed: (errorInfo: any) => void;
}

interface DataType {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    ip_address?: string;
}

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Please input your first name!').matches(/^[A-Za-z]+$/, 'Please input a valid first name (only letters are allowed)'),
    last_name: Yup.string().required('Please input your first name!').matches(/^[A-Za-z]+$/, 'Please input a valid first name (only letters are allowed)'),
    email: Yup.string().email('Invalid email address').required('Please input your email!'),
    gender: Yup.string().required('Please select your gender!'),
    ip_address: Yup.string().required('Please input your IP Address!'),
});

const yupSync =  {
    async validator({field}, value) {
        await validationSchema.validateSyncAt(field, {[field]: value})
    }
}

const UserForm: React.FC<UserFormProps> = ({ isEdit, userID}: UserFormProps) => {
    // const initialValues = userID ? { ...userID } : {};

    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<DataType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const response = await axios.get(`/users/${id}`);
            console.log(response.data)
            console.log(isEdit)
            setUser(response.data);
            setIsLoading(false);
        };

        if (isEdit && id) {
            fetchUser();
        }
    }, [id, isEdit]);

    const onFinish = async (values: any) => {
        setIsLoading(true);
        try {
            if (isEdit) {
                await axios.put(`/users/${id}`, values);
            } else {
                const response = await axios.post('/users', values);
                console.log('New user added:', response.data);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };



    const onFinishFailed = () => {
        console.log("submit failed")
    }

    console.log('user', user)


    // if (isEdit && !user) {
    //     return <div>Loading...</div>
    // }

    if (isLoading) {
        return <Spin size="large" />;
    }
    return (
            <main className='userFormContainer' style={{ background: theme === "light" ? "#f0f0f0" : "#333",  color: theme === "light" ? "black" : "white" }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8, style: { color: theme === "light" ? "black" : "white" } }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={user ? user : {}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="ID" name="id" >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="First name"
                        name="first_name"
                        rules={[yupSync]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last name"
                        name="last_name"
                        rules={[yupSync]} >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[yupSync]}    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[yupSync]}   >
                        <Select>
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                            <Select.Option value="Genderfluid">Genderfluid</Select.Option>
                            <Select.Option value="Non-binary">Non-binary</Select.Option>
                            <Select.Option value="Genderqueer">Genderqueer</Select.Option>
                            <Select.Option value="Polygender">Polygender</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="IP Address"
                        name="ip_address"
                        rules={[yupSync]}   >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {isEdit ? 'Update' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </main>

    );
};

export default UserForm;
