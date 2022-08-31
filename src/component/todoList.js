import React from 'react';
import TodoItem from './todoItem';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const TodoList = (prop) => {

    const { todolist, checkDoneItem, deleteItem, undocount, deleteALLComplete, getCompleteList, mytabs } = prop;
    let currenttab = mytabs.find((item, idx) => {
        if (item.className === "active") {
            return true;
        }
    })
    return (
        <div className="todoList_items">
            <ul className="todoList_item">
                {
                    (undocount === 0 ) ? (<li style={{ paddingLeft: "35%", }}>目前尚無待辦事項</li>) : ""
                }
                {
                    todolist.map((item, idx) => {
                        return <TodoItem key={idx}
                            item={item}
                            checkDoneItem={checkDoneItem}
                            deleteItem={deleteItem} />
                    })
                }
            </ul>
            <div className="todoList_statistics">
                <p> {undocount}個待完成項目</p>
                <a href="#" onClick={() => {

                    let completelist = getCompleteList();

                    let message = `清除所有已完成項目 ${completelist.length} 項`;
                    MySwal.fire({
                        title: 'Are you sure?',
                        text: message,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            deleteALLComplete();
                        }
                    })


                }}>清除已完成項目</a>
            </div>
        </div>
    )
};

export default TodoList;