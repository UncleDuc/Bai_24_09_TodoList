import React, { useState } from 'react';
import { Input, Button, List, Typography, Select } from 'antd';
import 'antd/dist/antd.min.css';
const Title = Typography;
const { Option } = Select;

export const Todo = () => {
    // Khởi Tạo Trạng Thái
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');  // Thêm trạng thái tìm kiếm
    const [searchQuery, setSearchQuery] = useState('');    // Thêm tìm kiếm

    const handleAddTodo = () => {
        if (inputValue) {
            const newTodo = {
                content: inputValue,
                status: 'new',  // Công việc mới có trạng thái 'new'
            };
            setTodos([...Todos, newTodo]);
            setInputValue('');
        };
    };

    // hàm đánh dấu trạng thái công việc
    const handleStatusChange = (index, status) => {
        const newTodos = [...Todos];
        newTodos[index].status = status;
        setTodos(newTodos);
    };

    // hàm xóa công việc
    const handleDeleteTodo = (index) => {
        const newTodos = [...Todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    // Hàm để bắt đầu chỉnh sửa công việc
    const handleEditTodo = (index) => {
        setInputValue(Todos[index].content); // Đặt nội dung công việc vào ô nhập
        setEditIndex(index); // Ghi lại chỉ số công việc đang chỉnh sửa
    };

    // Hàm để xác nhận chỉnh sửa công việc
    const handleUpdateTodo = () => {
        if (editIndex !== null && inputValue) {
            const newTodos = [...Todos];
            newTodos[editIndex].content = inputValue; // Cập nhật nội dung công việc
            setTodos(newTodos);
            setInputValue(''); // Reset input rỗng
            setEditIndex(null); // Đặt lại chỉ số chỉnh sửa
        }
    };

    // Hàm tìm kiếm công việc dựa trên từ khóa
    const filteredTodos = Todos.filter((todo) => {
        return (
            (statusFilter === '' || todo.status === statusFilter) &&  // Lọc theo trạng thái
            todo.content.toLowerCase().includes(searchQuery.toLowerCase())  // Lọc theo từ khóa tìm kiếm
        );
    });

    return (
        <>
            <div style={{
                marginTop:'50px',
                padding: '40px',
                backgroundColor: '#ddd',
                maxWidth: '800px',
                margin: '0 auto',
                borderRadius: '10px',
                    
            }}>
                <Title
                    level={2}
                    style={{
                        fontSize: '36px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: '#1890ff',
                        marginBottom: '20px',
                    }}
                >
                    Todo-List
                </Title>

                {/* Ô tìm kiếm công việc */}
                <Input
                    value={searchQuery}
                    placeholder='Tìm kiếm công việc'
                    style={{
                        marginRight: '10px',
                        width: '300px',
                        marginBottom: '20px',
                        height: '40px',
                        borderRadius: '5px',
                        border: '1px solid #d9d9d9',
                        fontSize: '16px',
                    }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Bộ lọc trạng thái */}
                <Select
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    style={{
                        width: 200,
                        marginBottom: '20px',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        fontSize: '16px',
                    }}
                    placeholder="Lọc theo trạng thái"
                >
                    <Option value="">Tất cả</Option>
                    <Option value="new">New</Option>
                    <Option value="doing">Doing</Option>
                    <Option value="done">Done</Option>
                </Select>

                <br />

                <Input
                    value={inputValue}
                    placeholder='Nhập công việc'
                    style={{
                        marginRight: '10px',
                        width: '500px',
                        height: '50px',
                        fontSize: '18px',
                        borderRadius: '5px',
                        border: '2px solid #d9d9d9',
                        padding: '8px',
                        marginBottom: '20px',
                    }}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    type="primary"
                    style={{
                        height: '50px',
                        fontSize: '16px',
                        borderRadius: '5px',
                    }}
                    onClick={editIndex !== null ? handleUpdateTodo : handleAddTodo}
                >
                    {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                </Button>

                <List
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    bordered={true}
                    dataSource={filteredTodos}  // Sử dụng danh sách đã lọc
                    renderItem={(item, index) => (
                        <List.Item
                            style={{
                                padding: '20px',
                                backgroundColor: item.status === 'done' ? '#f0f5ff' : '#fff',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                            actions={[
                                <Select
                                    value={item.status}
                                    style={{
                                        width: 120,
                                        marginRight: '10px',
                                        fontSize: '16px',
                                    }}
                                    onChange={(value) => handleStatusChange(index, value)}
                                >
                                    <Option value="new">New</Option>
                                    <Option value="doing">Doing</Option>
                                    <Option value="done">Done</Option>
                                </Select>,
                                <Button
                                    type="link"
                                    onClick={() => handleEditTodo(index)}
                                    style={{ fontSize: '16px' }}
                                >
                                    Chỉnh sửa
                                </Button>,
                                <Button
                                    type="link"
                                    onClick={() => handleDeleteTodo(index)}
                                    style={{ fontSize: '16px', color: '#f5222d' }}
                                >
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <span
                                style={{
                                    textDecoration: item.status === 'done' ? 'line-through' : 'none',
                                    fontSize: '18px',
                                    color: item.status === 'done' ? '#52c41a' : '#000',
                                }}
                            >
                                {item.content}
                            </span>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};
