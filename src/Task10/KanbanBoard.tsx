import React, { useState } from "react";
import { Row, Col, Card, Input } from "antd";

interface ITodo {
    id: number;
    title: string;
    column: string;
    isOver?: boolean;
}

interface IColumn {
    key: string;
    title: string;
}

const columns: IColumn[] = [
    { key: "todo", title: "To Do" },
    { key: "doing", title: "Doing" },
    { key: "done", title: "Done" },
];

const initialTodos: ITodo[] = [
    { id: 1, title: "Task 1", column: "todo" },
    { id: 2, title: "Task 2", column: "todo" },
    { id: 3, title: "Task 3", column: "doing" },
    { id: 4, title: "Task 4", column: "done" },
];

const KanbanBoard: React.FC = () => {
    const [todos, setTodos] = useState(initialTodos);

    const handleDragStart = (event, id) => {
        event.dataTransfer.setData("text/plain", id.toString());
    };

    const handleDrop = (event, column) => {
        const id = parseInt(event.dataTransfer.getData("text/plain"));
        const sourceColumn = todos.find((todo) => todo.id === id)?.column;

        if (sourceColumn === column) {
            const newTodos = [...todos];
            const sourceIndex = newTodos.findIndex((todo) => todo.id === id);
            const task = newTodos.splice(sourceIndex, 1)[0];
            const destIndex = newTodos.findIndex((todo) => todo.isOver);
            newTodos.splice(destIndex, 0, { ...task, isOver: false });
            setTodos(newTodos);
            return;
        }

        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, column, isOver: false } : todo
        );

        setTodos(newTodos);
    };

    const handleDragEnter = (event, id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isOver: true };
            }
            return { ...todo, isOver: false };
        });
        setTodos(newTodos);
    };

    const handleDragLeave = (event, id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isOver: false };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };


    return (
        <div>
            <Row gutter={[16, 16]}>
                {columns.map((column) => (
                    <Col key={column.key} span={8}>
                        <Card title={column.title}>
                            <div
                                onDrop={(event) => handleDrop(event, column.key)}
                                onDragOver={handleDragOver}
                            >
                                <div style = {{height: '4vh'}}></div>
                                {todos
                                    .filter((todo) => todo.column === column.key)
                                    .map((todo) => (
                                        <div
                                            key={todo.id}
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, todo.id)}
                                            onDragEnter={(event) => handleDragEnter(event, todo.id)}
                                            onDragLeave={(event) => handleDragLeave(event, todo.id)}
                                            onDrop={(event) => handleDrop(event, column.key)}
                                            style={{
                                                marginBottom: 8,
                                                backgroundColor: todo.isOver ? "lightblue" : "white",
                                                padding: 8,
                                                cursor: "move",
                                            }}
                                        >
                                            {todo.title}
                                        </div>

                                    ))}
                            </div>
                            <Input placeholder="Add task" onPressEnter={(event) => {
                                const newTodos = [...todos, { id: todos.length + 1, title: event.currentTarget.value, column: column.key }]
                                setTodos(newTodos)
                                event.currentTarget.value = ""
                            }} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default KanbanBoard;
