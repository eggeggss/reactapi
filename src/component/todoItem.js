import React from 'react';

const TodoItem = (prop) => {
    const { item, checkDoneItem, deleteItem } = prop;
    return (
        <li>
            <label className="todoList_label">
                <input className="todoList_input" type="checkbox"
                    checked={item.isdone}
                    value={item.isdone} onChange={(e) => {
                        checkDoneItem(item.id,item.guid);
                    }} />
                <span>{item.item}</span>
            </label>
            <a href="#" onClick={() => {
                deleteItem(item.id, item.item,item.guid);
            }}>
                <i className="fa fa-times"></i>
            </a>
        </li>
    );
};

export default TodoItem;