import {useState, useEffect} from "react";
import axios from "../utils/axios";
import {DataType} from "../components/UserList";

const Task9  = () => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10)
    const fetchData = async () => {
          const res = await axios.get('/users');
          setData(res.data)
    }

    const handleReadMore = () => {
        setLimit(limit + 5);
    };

    useEffect(() => {
        fetchData()
    }, []);

    console.log(data)

    return(
        <>
            {
                data.slice(0, limit).map((item: DataType) => {
                  return(
                      <div key={item.id}>
                          <h2>{item.first_name}</h2>
                          <p>{item.last_name}</p>
                          <p>{item.email}</p>
                      </div>
                  )
                })
            }
            {data.length > limit ? (
                <button onClick={handleReadMore}>Read More</button>
            ) : null}
        </>
    )
}

export default Task9