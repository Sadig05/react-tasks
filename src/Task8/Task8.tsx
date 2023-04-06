import React from 'react';
import useFetch from './CustomHook';

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
}

const Task8 = () => {
    const { data, error, isLoading, reload } = useFetch<IUser[]>(
        'http://localhost:3004/users'
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <button onClick={reload}>Reload</button>
            {data?.map((user) => (
                <div key={user.id}>
                    <h2>{user.first_name}</h2>
                    <p>{user.last_name}</p>
                </div>
            ))}
        </div>
    );
};

export default Task8;
