import React, { useState, useCallback } from 'react';
import { Input, Button, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface Todo {
    id: number;
    text: string;
}

const Task11: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const handleChange = useCallback((event) => {
        setNewTodo(event.target.value);
    }, []);

    const addTodo = useCallback(() => {
        if (newTodo.trim() !== '') {
            const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
            const newTodoItem: Todo = { id: newId, text: newTodo };
            setTodos((prevTodos) => [...prevTodos, newTodoItem]);
            setNewTodo('');
        }
    }, [newTodo, todos]);

    const removeTodo = useCallback((id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, []);

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <Input placeholder="Add a to-do item" value={newTodo} onChange={handleChange} />
            <Button type="primary" onClick={addTodo} style={{ margin: '10px 0' }}>
                Add
            </Button>
            <List
                dataSource={todos}
                renderItem={(todo) => (
                    <List.Item
                        actions={[<Button onClick={() => removeTodo(todo.id)} icon={<DeleteOutlined />} danger></Button>]}
                    >
                        {todo.text}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Task11;
