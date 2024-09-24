// src/App.js
import React, { useState } from 'react';
import { Input, Button, List, Typography } from 'antd';
import 'antd/dist/antd.min.css';
const Title = Typography;

export const Todo = ()=>{
    //Khởi Tạo Trạng Thái
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState([]);
    const [editIndex, setEditIndex] = useState([]);

    const handleAddTodo = () => {
        if(inputValue){
            const newTodo ={
                content :inputValue,
                completed: false,
            }
            setTodos([...Todos,newTodo]);
            setInputValue('');
        };
    }
    // hàm đánh dấu hoàn thành công việc
    const handleCompleteTodo = (index) => {
        const newTodo = [...Todos];
        newTodo[index].completed = true;
        setTodos(newTodo);
    };
    // hàm xóa công việc
    const handleDeleteTodo = (index) =>{
        const newTodo = [...Todos];
        newTodo.splice(index,1);
        setTodos(newTodo);
    }

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


    return(
        <>
            <div style={{padding: '20px'}}>
                <Title 
                    level={2}
                    style={{
                        fontSize:'32px',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold'
                    }}
                    >
                        Todo-List
                </Title>
                <Input
                    value={inputValue}
                    placeholder='nhập công việc'
                    style={{marginRight: '10px',
                            width:'500px',
                            height :'50px', 
                            fontSize:'23px',
                            border:'3px solid #ddd'
                        }}
                    onChange={(e)=>setInputValue(e.target.value)}
                />
                <Button 
                    type="primary" 
                    onClick={editIndex !== null ? handleUpdateTodo : handleAddTodo}
                    >
                        {editIndex !== null ? 'Cập nhật' : 'Thêm'}
                </Button>
                <List
                    style={{ marginTop: '20px' }}
                    bordered
                    dataSource={Todos}
                    renderItem={(item, index) => (
                    <List.Item
                        actions={[    
                            <Button
                                type="link"
                                onClick={() => handleCompleteTodo(index)}
                                disabled={item.completed}
                                style={{fontSize:'20px'}}
                            >
                                {item.completed ? 'Đã hoàn thành' : 'Hoàn thành'}
                            </Button>,
                            <Button 
                                type="link" 
                                onClick={() => handleEditTodo(index)} 
                                style={{fontSize:'20px'}}>
                                Chỉnh sửa
                            </Button>,
                            <Button type="link" onClick={() => handleDeleteTodo(index)} style={{fontSize:'20px'}}>
                                Xóa
                            </Button>,
                        ]}
                    >
                        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' , 
                                       fontSize:'20px'}}
                             >
                                {item.content}
                        </span>
                    </List.Item>
                    )}
                />
            </div>
        </>
    )
}

