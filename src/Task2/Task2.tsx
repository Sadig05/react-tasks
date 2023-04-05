import {useState, useEffect} from "react";

const Task2 = (props: any) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect( () => {
         fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
               setUsers(data);
               setLoading(false)
            });
    },[])

    function renderUser(user: any) {
        return (
            <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <>
            <div>
                {users.map((user) => {
                    return renderUser(user);
                })}
            </div>
        </>
    )
}

export default Task2
