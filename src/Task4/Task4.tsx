import React, { useState } from 'react';
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import styles from './Task4.module.scss'
function Task4() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>Counter</h1>
            <h3>{count}</h3>
            <PlusOutlined onClick={increment} className={styles.element} />
            <MinusOutlined onClick={decrement} className={styles.element}/>
        </div>
    );
}

export default Task4;
