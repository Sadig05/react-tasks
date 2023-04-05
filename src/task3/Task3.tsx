import React , {useState} from "react";
import styles from './Task3.module.scss'
import {Card} from "antd";
const data = [
    {
        "id": 1,
        first_name: "Melisent",
        last_name: "Peotzeecc",
        email: "mpeotz0@fda.gov",
        gender: "Female",
        ip_address: "200.172.204.11"
    },
    {
        id: 2,
        first_name: "Bobbette",
        last_name: "Willacot",
        email: "bwillacot1@behance.net",
        gender: "Female",
        ip_address: "200.172.204.11"
    },
    {
        id: 3,
        first_name: "Dory",
        last_name: "Wix",
        email: "dwix2@cloudflare.com",
        gender: "Non-binary",
        ip_address: "134.82.38.45"
    },
    {
        id: 4,
        first_name: "Adam",
        last_name: "Jacquemy",
        email: "ajacquemy3@illinois.edu",
        gender: "Male",
        ip_address: "193.223.233.50"
    },
    {
        id: 5,
        first_name: "Audra",
        last_name: "MacDermid",
        email: "amacdermid4@example.com",
        gender: "Polygender",
        ip_address: "224.132.77.222"
    },
    {
        id: 6,
        first_name: "Kylie",
        last_name: "Camble",
        email: "kcamble5@miitbeian.gov.cn",
        gender: "Female",
        ip_address: "112.210.63.48"
    },
    {
        id: 7,
        first_name: "Winny",
        last_name: "Itskovitz",
        email: "witskovitz6@addtoany.com",
        gender: "Male",
        ip_address: "38.2.251.140"
    },
    {
        id: 8,
        first_name: "Jonas",
        last_name: "Baish",
        email: "jbaish7@diigo.com",
        gender: "Male",
        ip_address: "106.17.160.9"
    },
    {
        id: 9,
        first_name: "Pooh",
        last_name: "Le Fevre",
        email: "plefevre8@gmpg.org",
        gender: "Male",
        ip_address: "158.251.251.52"
    },
    {
        id: 10,
        first_name: "Ronny",
        last_name: "Saffill",
        email: "rsaffill9@dropbox.com",
        gender: "Male",
        ip_address: "92.43.119.194"
    },
]

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;

}

const Task3 = () => {

return(
    <main className = {styles.cards}>

        {
            data.map((item: IUser) => {
                return (

                        <Card title={`User ${item.id}`} bordered={false} style={{ width: 300 }} key={item.id}>
                            <p>{item.first_name}</p>
                            <p>{item.last_name}</p>
                            <p>{item.email}</p>
                            <p>{item.gender}</p>
                            <p>{item.ip_address}</p>
                        </Card>

                )
            })
        }

</main>
)
}


export default Task3