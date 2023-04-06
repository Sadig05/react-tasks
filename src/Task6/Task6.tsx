import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "../utils/axios";
import styles from './Task6.module.scss'
interface FormData {
    name: string;
    password: string;
}
import {Button } from 'antd'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Task6 = () => {
    const onSubmit = async (values: FormData) => {
        try {
            const response = await axios.post('/form-post', values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.formContainer}>

            <Formik
                initialValues={{
                    name: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" className={`${touched.name && errors.name ? styles.error : ''}`} />
                            {touched.name && errors.name && <ErrorMessage name="name" component="div" className={styles.error} />}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className={`${touched.password && errors.password ? styles.error : ''}`} />
                            {touched.password && errors.password && <ErrorMessage name="password" component="div" className={styles.error} />}
                        </div>


                        <Button type="primary" htmlType='submit'>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>


    );
};

export default Task6;
